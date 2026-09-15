import React, { useState } from 'react';
import { useF2 } from '../../context/F2Context';
import { 
  X, 
  ShoppingBag, 
  Utensils, 
  Clock, 
  Star, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  Plus, 
  Minus, 
  Sparkles, 
  ShieldCheck,
  AlertCircle,
  ChevronRight,
  Flame,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { OnlineFoodItem, OnlineFoodRestaurant } from '../../types';

interface CartItem {
  restaurantId: string;
  restaurantName: string;
  platform: 'Swiggy' | 'Zomato' | 'Hospital Express';
  item: OnlineFoodItem;
  quantity: number;
}

export const DoctorFoodOrderingModal: React.FC = () => {
  const { 
    currentDoctor, 
    currentWallet, 
    onlineRestaurants, 
    isFoodOrderingOpen, 
    setIsFoodOrderingOpen,
    processOnlineFoodOrder,
    setDoctorStep 
  } = useF2();

  const [selectedPlatform, setSelectedPlatform] = useState<'ALL' | 'Swiggy' | 'Zomato' | 'Hospital Express'>('ALL');
  const [selectedRestaurant, setSelectedRestaurant] = useState<OnlineFoodRestaurant | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [deliveryLocation, setDeliveryLocation] = useState('Doctors’ Lounge & Rest Suite (Room 302)');
  const [customLocation, setCustomLocation] = useState('');
  const [specialNotes, setSpecialNotes] = useState('Call upon reaching, currently between patient rounds.');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [placedOrderInfo, setPlacedOrderInfo] = useState<any | null>(null);

  if (!isFoodOrderingOpen) return null;

  const card = currentWallet?.virtualCard;
  const balance = currentWallet?.balance ?? 0;

  // Filter restaurants
  const filteredRestaurants = onlineRestaurants.filter((r) => 
    selectedPlatform === 'ALL' || r.platform === selectedPlatform
  );

  // Cart calculations
  const totalItemCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartSubtotal = cart.reduce((acc, curr) => acc + (curr.item.price * curr.quantity), 0);
  const deliveryFee = cart.some(c => c.platform === 'Hospital Express') ? 0 : 25;
  const totalOrderAmount = cartSubtotal > 0 ? cartSubtotal + deliveryFee : 0;

  const handleAddItem = (restaurant: OnlineFoodRestaurant, item: OnlineFoodItem) => {
    setCart((prev) => {
      // Check if item is from another restaurant
      const existingFromOther = prev.find((c) => c.restaurantId !== restaurant.id);
      let baseCart = prev;
      if (existingFromOther) {
        // Clear previous restaurant if switching
        baseCart = [];
      }

      const existingItem = baseCart.find((c) => c.item.id === item.id);
      if (existingItem) {
        return baseCart.map((c) => 
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [
        ...baseCart, 
        { 
          restaurantId: restaurant.id, 
          restaurantName: restaurant.name, 
          platform: restaurant.platform, 
          item, 
          quantity: 1 
        }
      ];
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === itemId);
      if (!existing) return prev;
      if (existing.quantity === 1) {
        return prev.filter((c) => c.item.id !== itemId);
      }
      return prev.map((c) => 
        c.item.id === itemId ? { ...c, quantity: c.quantity - 1 } : c
      );
    });
  };

  const getItemQuantityInCart = (itemId: string) => {
    return cart.find((c) => c.item.id === itemId)?.quantity || 0;
  };

  const handleExecuteCheckout = () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);
    setOrderError(null);

    const firstCartItem = cart[0];
    const finalLocation = customLocation.trim() ? customLocation.trim() : deliveryLocation;

    setTimeout(() => {
      const res = processOnlineFoodOrder({
        restaurantId: firstCartItem.restaurantId,
        restaurantName: firstCartItem.restaurantName,
        platform: firstCartItem.platform,
        items: cart.map(c => ({
          name: c.item.name,
          price: c.item.price,
          quantity: c.quantity
        })),
        deliveryLocation: finalLocation,
        notes: specialNotes,
        totalAmount: totalOrderAmount
      });

      setIsCheckingOut(false);

      if (res.success && res.order) {
        setPlacedOrderInfo(res.order);
        setCart([]);
      } else {
        setOrderError(res.error || 'Checkout failed. Please check your virtual card settings.');
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden my-auto"
      >
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Doctor Food & Meal Ordering
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-200">
                  Pluxee Virtual Card Enabled
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Order directly to your ICU, OT or Lounge using your ₹{balance} corporate balance
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsFoodOrderingOpen(false);
              setPlacedOrderInfo(null);
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {placedOrderInfo ? (
            /* Order Placed Success View */
            <div className="py-8 px-4 text-center max-w-lg mx-auto space-y-5">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm animate-bounce">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                  <span>Order Placed & Card Debited</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Order #{placedOrderInfo.orderNumber} Confirmed!
                </h3>
                <p className="text-xs text-slate-600">
                  Your meal from <span className="font-semibold text-slate-800">{placedOrderInfo.restaurantName}</span> is being prepared and will be delivered to:
                </p>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-teal-800 font-mono">
                  📍 {placedOrderInfo.deliveryLocation}
                </div>
              </div>

              {/* Card Receipt Summary */}
              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 text-left space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-teal-200/60">
                  <span className="text-teal-900 font-bold">Paid with F2 Virtual Card</span>
                  <span className="font-mono font-bold text-teal-900">•••• {placedOrderInfo.cardLast4}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Total Amount Debited</span>
                  <span className="font-code font-bold text-slate-900">₹{placedOrderInfo.totalAmount}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Arrival</span>
                  <span className="font-semibold text-teal-800">{placedOrderInfo.estimatedDeliveryMins} mins</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Remaining Benefit Balance</span>
                  <span className="font-code font-bold text-emerald-700">₹{balance}</span>
                </div>
              </div>

              <div className="flex gap-3 justify-center pt-2">
                <button
                  onClick={() => setPlacedOrderInfo(null)}
                  className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all shadow-xs"
                >
                  Order Another Meal
                </button>
                <button
                  onClick={() => {
                    setIsFoodOrderingOpen(false);
                    setPlacedOrderInfo(null);
                    setDoctorStep('SCREEN_6_HISTORY');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <span>View in Audit Ledger</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Main Menu & Cart Flow */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Platform Tabs & Menus */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* Platform Filter Buttons */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                  {[
                    { id: 'ALL', label: 'All Providers' },
                    { id: 'Swiggy', label: 'Swiggy Gourmet' },
                    { id: 'Zomato', label: 'Zomato 24/7 Night Duty' },
                    { id: 'Hospital Express', label: 'Hospital Express Lounge' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPlatform(p.id as any)}
                      className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-semibold transition-all ${
                        selectedPlatform === p.id
                          ? 'bg-teal-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Restaurants & Items List */}
                <div className="space-y-6">
                  {filteredRestaurants.map((rest) => (
                    <div 
                      key={rest.id}
                      className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-4"
                    >
                      {/* Restaurant Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                              rest.platform === 'Swiggy'
                                ? 'bg-orange-100 text-orange-800'
                                : rest.platform === 'Zomato'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-teal-100 text-teal-800'
                            }`}>
                              {rest.platform}
                            </span>
                            <h4 className="font-bold text-slate-900 text-sm">
                              {rest.name}
                            </h4>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {rest.cuisine} • <span className="text-teal-700 font-semibold">{rest.distanceStr}</span>
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs">
                          <span className="flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            {rest.rating}
                          </span>
                          <span className="flex items-center gap-1 text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 font-medium">
                            <Clock className="w-3 h-3 text-teal-600" />
                            {rest.deliveryTimeMins}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-2.5">
                        {rest.items.map((item) => {
                          const qty = getItemQuantityInCart(item.id);
                          return (
                            <div 
                              key={item.id}
                              className="p-3 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs hover:border-teal-200 transition-all"
                            >
                              <div className="space-y-1 max-w-sm">
                                <div className="flex items-center gap-2">
                                  <span className={`w-3 h-3 border flex items-center justify-center p-0.5 rounded-xs ${
                                    item.isVeg ? 'border-emerald-600' : 'border-rose-600'
                                  }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                      item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                                    }`} />
                                  </span>
                                  <h5 className="font-bold text-slate-900 text-xs">{item.name}</h5>
                                  {item.badge && (
                                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 line-clamp-2">{item.description}</p>
                                {item.calories && (
                                  <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                                    <Flame className="w-2.5 h-2.5 text-amber-500" />
                                    {item.calories}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                                <span className="font-code font-bold text-slate-900 text-sm">
                                  ₹{item.price}
                                </span>

                                {qty > 0 ? (
                                  <div className="flex items-center gap-1.5 bg-teal-50 border border-teal-300 rounded-lg p-1">
                                    <button
                                      onClick={() => handleRemoveItem(item.id)}
                                      className="p-1 rounded bg-white text-teal-800 hover:bg-teal-100 shadow-2xs"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="font-code font-bold text-xs text-teal-900 px-1.5">
                                      {qty}
                                    </span>
                                    <button
                                      onClick={() => handleAddItem(rest, item)}
                                      className="p-1 rounded bg-white text-teal-800 hover:bg-teal-100 shadow-2xs"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => handleAddItem(rest, item)}
                                    className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs flex items-center gap-1 transition-all"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>Add</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                    </div>
                  ))}
                </div>

              </div>

              {/* Right Column: Active Cart & 1-Click Card Checkout */}
              <div className="lg:col-span-5 space-y-4">
                
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 sticky top-0">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-teal-600" />
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Doctor Meal Cart ({totalItemCount})
                      </h4>
                    </div>
                    {cart.length > 0 && (
                      <button
                        onClick={() => setCart([])}
                        className="text-[11px] text-rose-600 hover:underline font-medium"
                      >
                        Clear Cart
                      </button>
                    )}
                  </div>

                  {cart.length === 0 ? (
                    <div className="py-8 text-center text-slate-400 space-y-2">
                      <Utensils className="w-8 h-8 mx-auto opacity-30" />
                      <p className="text-xs">Your meal cart is empty.</p>
                      <p className="text-[11px] text-slate-500">
                        Pick healthy bowls, night shift rolls or lounge coffee from the left.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      
                      {/* Cart Items List */}
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {cart.map((c) => (
                          <div key={c.item.id} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-200/60">
                            <div>
                              <div className="font-semibold text-slate-800">{c.item.name}</div>
                              <div className="text-[10px] text-slate-400">₹{c.item.price} × {c.quantity}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-code font-bold text-slate-900">
                                ₹{c.item.price * c.quantity}
                              </span>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleRemoveItem(c.item.id)}
                                  className="w-5 h-5 rounded bg-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-300"
                                >
                                  -
                                </button>
                                <button
                                  onClick={() => handleAddItem({ id: c.restaurantId, name: c.restaurantName, platform: c.platform } as any, c.item)}
                                  className="w-5 h-5 rounded bg-teal-600 flex items-center justify-center text-white hover:bg-teal-700"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Delivery Location Selector */}
                      <div className="space-y-2 pt-2 border-t border-slate-200">
                        <label className="text-[11px] font-bold text-slate-700 block">
                          Hospital Drop-off Location
                        </label>
                        <select
                          value={deliveryLocation}
                          onChange={(e) => setDeliveryLocation(e.target.value)}
                          className="w-full p-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 outline-none focus:border-teal-600"
                        >
                          <option value="Doctors’ Lounge & Rest Suite (Room 302)">Doctors’ Lounge & Rest Suite (Room 302)</option>
                          <option value="Main OT Complex — Anesthesia Cabin 4">Main OT Complex — Anesthesia Cabin 4</option>
                          <option value="ICU / CCU Station — 2nd Floor">ICU / CCU Station — 2nd Floor</option>
                          <option value="OPD Block Room 104">OPD Block Room 104</option>
                          <option value="Hospital Staff Canteen Pick-up Counter">Hospital Staff Canteen Pick-up Counter</option>
                          <option value="Custom">Other Custom Ward / Cabin...</option>
                        </select>

                        {deliveryLocation === 'Custom' && (
                          <input
                            type="text"
                            placeholder="Specify Room / Ward / Department..."
                            value={customLocation}
                            onChange={(e) => setCustomLocation(e.target.value)}
                            className="w-full p-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 outline-none mt-1"
                          />
                        )}
                      </div>

                      {/* Delivery Instructions */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 block">
                          Doctor Shift Notes
                        </label>
                        <input
                          type="text"
                          value={specialNotes}
                          onChange={(e) => setSpecialNotes(e.target.value)}
                          placeholder="e.g. Leave with nurse station if on call"
                          className="w-full p-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 outline-none"
                        />
                      </div>

                      {/* Bill Breakdown */}
                      <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1.5 text-xs">
                        <div className="flex justify-between text-slate-600">
                          <span>Items Subtotal</span>
                          <span className="font-code">₹{cartSubtotal}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Hospital Delivery Fee</span>
                          <span className="font-code">{deliveryFee === 0 ? 'FREE (Internal)' : `₹${deliveryFee}`}</span>
                        </div>
                        <div className="flex justify-between text-slate-900 font-bold pt-1.5 border-t border-slate-100">
                          <span>Total to Pay</span>
                          <span className="font-code text-teal-800 font-extrabold text-sm">₹{totalOrderAmount}</span>
                        </div>
                      </div>

                      {/* Virtual Card Payment Method Badge */}
                      <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 font-bold text-teal-900">
                            <CreditCard className="w-4 h-4 text-teal-700" />
                            <span>F2 Virtual Card (RuPay)</span>
                          </div>
                          <span className="font-mono text-teal-800 font-semibold">•••• {card?.cardNumber.slice(-4)}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-teal-700">
                          <span>Available Benefit Balance:</span>
                          <span className="font-code font-bold">₹{balance}</span>
                        </div>
                      </div>

                      {orderError && (
                        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>{orderError}</span>
                        </div>
                      )}

                      {/* Checkout Button */}
                      <button
                        onClick={handleExecuteCheckout}
                        disabled={isCheckingOut || totalOrderAmount > balance || card?.isFrozen || !card?.onlineTxnsEnabled}
                        className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all ${
                          totalOrderAmount > balance || card?.isFrozen || !card?.onlineTxnsEnabled
                            ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                            : 'bg-teal-600 hover:bg-teal-700 text-white'
                        }`}
                      >
                        {isCheckingOut ? (
                          <span>Authorizing RuPay Virtual Card...</span>
                        ) : totalOrderAmount > balance ? (
                          <span>Insufficient Balance (₹{balance})</span>
                        ) : card?.isFrozen ? (
                          <span>Card Frozen (Unfreeze in Card Settings)</span>
                        ) : !card?.onlineTxnsEnabled ? (
                          <span>Online Txns Disabled in Settings</span>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            <span>Pay ₹{totalOrderAmount} with F2 Card</span>
                          </>
                        )}
                      </button>

                      <div className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-teal-600" />
                        <span>Pluxee-compliant MCC 5812 auto-settlement</span>
                      </div>

                    </div>
                  )}

                </div>

              </div>

            </div>
          )}

        </div>

      </motion.div>
    </div>
  );
};
