'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  WifiOff,
  RefreshCw,
  CloudOff,
  CalendarDays,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import {
  cacheData,
  getCachedData,
  queueTransaction,
  getPendingTransactions,
  markTransactionSynced,
  getPendingCount,
  type CachedService,
  type CachedEmployee,
  type CachedClient,
} from '@/lib/offline-db'

interface Service { id: string; name: string; price: number; duration_min: number; category: string | null }
interface Employee { id: string; name: string }
interface Client { id: string; name: string; phone: string | null }
interface CartItem { service: Service; qty: number }
type PaymentMethod = 'cash' | 'card' | 'transfer'

interface BookingContext {
  bookingId: string
  clientId: string
  serviceId: string
  staffId: string
  label: string
}

interface POSTerminalProps {
  businessId: string
  currency: string
  services: Service[]
  employees: Employee[]
  clients: Client[]
  bookingContext?: BookingContext
}

export function POSTerminal({ businessId, currency, services: initialServices, employees: initialEmployees, clients: initialClients, bookingContext }: POSTerminalProps) {
  const supabase = createClient()
  const router = useRouter()
  const t = useTranslations('pos')

  // ─── POS state ────────────────────────────────────────────────────────────
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [selectedClient, setSelectedClient] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash')
  const [discount, setDiscount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [receiptNumber, setReceiptNumber] = useState('')
  const [successAmount, setSuccessAmount] = useState(0)
  // bookingId to update appointment status after checkout
  const [activeBookingId] = useState(bookingContext?.bookingId ?? '')
  const [showBookingBanner, setShowBookingBanner] = useState(!!bookingContext)

  // ─── Offline state ────────────────────────────────────────────────────────
  const [isOnline, setIsOnline] = useState(true)
  const [pendingCount, setPendingCount] = useState(0)
  const [syncing, setSyncing] = useState(false)
  const [syncError, setSyncError] = useState('')

  // Active data — switches between server-loaded props and IndexedDB cache
  const [activeServices, setActiveServices] = useState<Service[]>(initialServices)
  const [activeEmployees, setActiveEmployees] = useState<Employee[]>(initialEmployees)
  const [activeClients, setActiveClients] = useState<Client[]>(initialClients)

  // ─── On mount (online): refresh clients from Supabase ───────────────────
  useEffect(() => {
    if (!navigator.onLine) return
    ;(async () => {
      const { data } = await supabase
        .from('clients')
        .select('id, name, phone')
        .eq('business_id', businessId)
        .order('name')
        .limit(200)
      if (data && data.length) setActiveClients(data as Client[])
    })().catch(() => {})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ─── On mount: cache POS data to IndexedDB ──────────────────────────────
  useEffect(() => {
    if (initialServices.length) {
      cacheData<CachedService>('services_cache', initialServices).catch(() => {})
    }
    if (initialEmployees.length) {
      cacheData<CachedEmployee>('employees_cache', initialEmployees).catch(() => {})
    }
    if (initialClients.length) {
      cacheData<CachedClient>('clients_cache', initialClients).catch(() => {})
    }
  }, [initialServices, initialEmployees, initialClients])

  // ─── On mount: prefill from booking context ──────────────────────────────
  useEffect(() => {
    if (!bookingContext) return
    const svc = initialServices.find((s) => s.id === bookingContext.serviceId)
    if (svc) setCart([{ service: svc, qty: 1 }])
    if (bookingContext.clientId) setSelectedClient(bookingContext.clientId)
    if (bookingContext.staffId) setSelectedEmployee(bookingContext.staffId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // only once on mount

  // ─── On mount: load pending count ──────────────────────────────────────
  useEffect(() => {
    getPendingCount().then(setPendingCount).catch(() => {})
  }, [])

  // ─── Online / offline detection ──────────────────────────────────────────
  useEffect(() => {
    const setOnline = () => setIsOnline(true)
    const setOffline = () => setIsOnline(false)
    setIsOnline(navigator.onLine)
    window.addEventListener('online', setOnline)
    window.addEventListener('offline', setOffline)
    return () => {
      window.removeEventListener('online', setOnline)
      window.removeEventListener('offline', setOffline)
    }
  }, [])

  // ─── When going offline: load data from IndexedDB if props are empty ───
  useEffect(() => {
    if (!isOnline && activeServices.length === 0) {
      getCachedData<Service>('services_cache').then((s) => { if (s.length) setActiveServices(s) }).catch(() => {})
      getCachedData<Employee>('employees_cache').then((e) => { if (e.length) setActiveEmployees(e) }).catch(() => {})
      getCachedData<Client>('clients_cache').then((c) => { if (c.length) setActiveClients(c) }).catch(() => {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline])

  // ─── Sync queue when coming back online ──────────────────────────────────
  const syncQueue = useCallback(async () => {
    setSyncing(true)
    setSyncError('')
    try {
      const pending = await getPendingTransactions()
      for (const tx of pending) {
        const { error } = await supabase.from('transactions').insert({
          business_id: tx.business_id,
          client_id: tx.client_id,
          employee_id: tx.employee_id,
          amount: tx.amount,
          payment_method: tx.payment_method,
          status: 'completed',
          items: tx.items,
        })
        if (!error) {
          await markTransactionSynced(tx.id)
        }
      }
      const remaining = await getPendingCount()
      setPendingCount(remaining)
    } catch {
      setSyncError('Sync failed. Will retry automatically.')
    } finally {
      setSyncing(false)
    }
  }, [supabase])

  useEffect(() => {
    if (isOnline && pendingCount > 0) {
      syncQueue()
    }
  }, [isOnline, pendingCount, syncQueue])

  // ─── Cart helpers ─────────────────────────────────────────────────────────
  const addToCart = (service: Service) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.service.id === service.id)
      if (existing) return prev.map((i) => i.service.id === service.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { service, qty: 1 }]
    })
  }

  const updateQty = (serviceId: string, delta: number) => {
    setCart((prev) =>
      prev.map((i) => i.service.id === serviceId ? { ...i, qty: i.qty + delta } : i).filter((i) => i.qty > 0)
    )
  }

  const subtotal = cart.reduce((sum, i) => sum + i.service.price * i.qty, 0)
  const total = Math.max(0, subtotal - discount)
  const categories = Array.from(new Set(activeServices.map((s) => s.category ?? 'Other')))

  // ─── Checkout ─────────────────────────────────────────────────────────────
  async function checkout() {
    if (cart.length === 0) return
    setLoading(true)
    const items = cart.map((i) => ({
      service_id: i.service.id,
      name: i.service.name,
      price: i.service.price,
      qty: i.qty,
    }))

    try {
      if (!isOnline) {
        // ── Offline: save to IndexedDB queue ──────────────────────────────
        const queued = await queueTransaction({
          business_id: businessId,
          client_id: selectedClient || null,
          employee_id: selectedEmployee || null,
          amount: total,
          payment_method: paymentMethod,
          items,
        })
        setReceiptNumber(queued.local_receipt)
        setPendingCount((n) => n + 1)
      } else {
        // ── Online: normal Supabase insert ────────────────────────────────
        const { data, error } = await supabase
          .from('transactions')
          .insert({
            business_id: businessId,
            client_id: selectedClient || null,
            employee_id: selectedEmployee || null,
            amount: total,
            payment_method: paymentMethod,
            status: 'completed',
            items,
          })
          .select('receipt_number')
          .single()

        if (error) throw error
        setReceiptNumber(data.receipt_number ?? '')
        router.refresh()

        // ── If came from Booking: mark appointment as completed ───────────
        if (activeBookingId) {
          supabase
            .from('appointments')
            .update({ status: 'completed' })
            .eq('id', activeBookingId)
            .then(({ error: apptErr }) => {
              if (apptErr) console.error('[POS] Failed to update booking status:', apptErr)
            })
        }
      }

      setSuccessAmount(total)
      setSuccess(true)
      setCart([])
      setDiscount(0)
      setSelectedClient('')
      setShowBookingBanner(false)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // ─── Success screen ───────────────────────────────────────────────────────
  if (success) {
    const isOfflineReceipt = receiptNumber.startsWith('OFFLINE-')
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="max-w-sm w-full text-center">
          <CardContent className="pt-8 pb-8">
            <CheckCircle2 className={`w-12 h-12 mx-auto mb-4 ${isOfflineReceipt ? 'text-orange-500' : 'text-green-500'}`} />
            <h2 className="text-xl font-semibold text-gray-900 mb-1">{t('success.heading')}</h2>
            <p className="text-sm text-gray-500 mb-1">{t('success.receipt')} {receiptNumber}</p>
            {isOfflineReceipt && (
              <p className="text-xs text-orange-600 bg-orange-50 rounded-lg px-3 py-2 mb-3">
                Saved offline. Will sync when internet is restored.
              </p>
            )}
            <p className="text-2xl font-bold text-gray-900 mb-6">{formatCurrency(successAmount, currency)}</p>
            <Button onClick={() => setSuccess(false)} className="w-full">{t('success.newSale')}</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ─── Main POS UI ──────────────────────────────────────────────────────────
  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Offline / sync banners */}
      {!isOnline && (
        <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 border-b border-orange-200 text-orange-800 text-sm">
          <WifiOff className="w-4 h-4 shrink-0" />
          <span className="font-medium">Offline mode</span>
          <span className="text-orange-600">— Sales will sync automatically when you reconnect.</span>
          {pendingCount > 0 && (
            <span className="ml-auto font-semibold">{pendingCount} pending</span>
          )}
        </div>
      )}

      {isOnline && pendingCount > 0 && (
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border-b border-blue-200 text-blue-800 text-sm">
          {syncing ? (
            <RefreshCw className="w-4 h-4 shrink-0 animate-spin" />
          ) : (
            <CloudOff className="w-4 h-4 shrink-0" />
          )}
          <span>
            {syncing
              ? `Syncing ${pendingCount} offline sale${pendingCount > 1 ? 's' : ''}…`
              : `${pendingCount} offline sale${pendingCount > 1 ? 's' : ''} pending sync`}
          </span>
          {!syncing && (
            <button onClick={syncQueue} className="ml-auto text-blue-600 hover:text-blue-800 font-medium underline">
              Sync now
            </button>
          )}
          {syncError && <span className="text-red-600 text-xs ml-2">{syncError}</span>}
        </div>
      )}

      {/* Booking context banner */}
      {showBookingBanner && bookingContext && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50 border-b border-indigo-200 text-indigo-900 text-sm">
          <CalendarDays className="w-4 h-4 shrink-0 text-indigo-500" />
          <span>{t('bookingBanner')} <strong>{bookingContext.label}</strong></span>
        </div>
      )}

      <div className="flex-1 flex gap-0 min-h-0">
        {/* ── Service grid ──────────────────────────────────────────────── */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            {categories.map((cat) => (
              <div key={cat}>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{cat}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {activeServices.filter((s) => (s.category ?? 'Other') === cat).map((s) => (
                    <button
                      key={s.id}
                      onClick={() => addToCart(s)}
                      className="text-left p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-sm transition-all"
                    >
                      <div className="font-medium text-gray-900 text-sm mb-1">{s.name}</div>
                      <div className="text-blue-600 font-semibold">{formatCurrency(s.price, currency)}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{s.duration_min} min</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {activeServices.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                {t('noServices')}{' '}
                <a href="/settings?tab=services" className="text-blue-600 hover:underline">
                  {t('addServices')}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* ── Cart ──────────────────────────────────────────────────────── */}
        <div className="w-80 shrink-0 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <ShoppingCart className="w-4 h-4" />
              {t('cart')} ({cart.reduce((s, i) => s + i.qty, 0)})
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase">{t('clientLabel')}</label>
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{t('walkIn')}</option>
                {activeClients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}{c.phone ? ` · ${c.phone}` : ''}
                  </option>
                ))}
              </select>
            </div>

            {activeEmployees.length > 0 && (
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">{t('employeeLabel')}</label>
                <select
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t('anyEmployee')}</option>
                  {activeEmployees.map((e) => (
                    <option key={e.id} value={e.id}>{e.name}</option>
                  ))}
                </select>
              </div>
            )}

            {cart.length === 0 ? (
              <div className="text-center text-sm text-gray-400 py-6">{t('emptyCart')}</div>
            ) : (
              cart.map((item) => (
                <div key={item.service.id} className="flex items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{item.service.name}</div>
                    <div className="text-xs text-gray-500">{formatCurrency(item.service.price, currency)}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => updateQty(item.service.id, -1)} className="p-1 rounded hover:bg-gray-100">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                    <button onClick={() => updateQty(item.service.id, 1)} className="p-1 rounded hover:bg-gray-100">
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => setCart((c) => c.filter((i) => i.service.id !== item.service.id))}
                      className="p-1 rounded hover:bg-red-50 text-red-400"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}

            {cart.length > 0 && (
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">{t('discountLabel')}</label>
                <input
                  type="number"
                  min={0}
                  max={subtotal}
                  value={discount || ''}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-100 space-y-3">
            <div className="grid grid-cols-3 gap-1">
              {(['cash', 'card', 'transfer'] as PaymentMethod[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setPaymentMethod(m)}
                  className={`py-2 rounded-lg text-xs font-medium capitalize transition-colors ${
                    paymentMethod === m ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t(`paymentMethods.${m}`)}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{t('totalLabel')}</span>
              <span className="text-xl font-bold text-gray-900">{formatCurrency(total, currency)}</span>
            </div>
            <Button
              onClick={checkout}
              disabled={cart.length === 0 || loading}
              className={`w-full h-12 text-base ${!isOnline ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
            >
              {loading
                ? t('processing')
                : isOnline
                  ? t('chargeButton')
                  : `Save offline · ${formatCurrency(total, currency)}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
