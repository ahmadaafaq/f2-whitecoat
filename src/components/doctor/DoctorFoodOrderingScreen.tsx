import React, { useState } from 'react';
import { useF2 } from '../../context/F2Context';
import { 
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
  ArrowRight,
  Search,
  ChevronLeft,
  X,
  Truck
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

export const DoctorFoodOrderingScreen: React.FC = () => {
  const { 
    currentDoctor, 
    currentWallet, 
    onlineRestaurants, 
    processOnlineFoodOrder,
    setDoctorStep 
  } = useF2();

  const [selectedPlatform, setSelectedPlatform] = useState<'ALL' | 'Swiggy' | 'Zomato' | 'Hospital Express'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [deliveryLocation, setDeliveryLocation] = useState('Doctors’ Lounge & Rest Suite (Room 302)');
  const [customLocation, setCustomLocation] = useState('');
  const [specialNotes, setSpecialNotes] = useState('Call upon reaching, currently between rounds.');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [placedOrderInfo, setPlacedOrderInfo] = useState<any | null>(null);
  const [isCartSheetOpen, setIsCartSheetOpen] = useState(false);

  const card = currentWallet?.virtualCard;
  const balance = currentWallet?.balance ?? 0;

  // Filter restaurants
  const filteredRestaurants = onlineRestaurants
    .filter((r) => selectedPlatform === 'ALL' || r.platform === selectedPlatform)
    .map((r) => {
      if (!searchQuery.trim()) return r;
      const q = searchQuery.toLowerCase();
      const filteredItems = r.items.filter(
        (it) => it.name.toLowerCase().includes(q) || it.description.toLowerCase().includes(q)
      );
      const matchesName = r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q);
      return matchesName || filteredItems.length > 0 ? { ...r, items: matchesName ? r.items : filteredItems } : null;
    })
    .filter(Boolean) as OnlineFoodRestaurant[];

  // Cart calculations
  const totalItemCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartSubtotal = cart.reduce((acc, curr) => acc + (curr.item.price * curr.quantity), 0);
  const deliveryFee = cart.some(c => c.platform === 'Hospital Express') ? 0 : 25;
  const totalOrderAmount = cartSubtotal > 0 ? cartSubtotal + deliveryFee : 0;

  const handleAddItem = (restaurant: OnlineFoodRestaurant, item: OnlineFoodItem) => {
    setCart((prev) => {
      const existingFromOther = prev.find((c) => c.restaurantId !== restaurant.id);
      let baseCart = prev;
      if (existingFromOther) {
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
        setIsCartSheetOpen(false);
      } else {
        setOrderError(res.error || 'Checkout failed. Please verify virtual card status.');
      }
    }, 600);
  };

  return (
    <div className="w-full mx-auto px-0.5 sm:px-1 py-1 space-y-3.5 pb-20">
      
      {/* Screen Header Marker */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
        <div className="flex items-center gap-1.5 min-w-0">
          <button
            onClick={() => setDoctorStep('SCREEN_4_WALLET_HOME')}
            className="p-1 -ml-1 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
            title="Back to Wallet"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200 shrink-0">
            FOOD ORDERING
          </span>
          <span className="text-[11px] font-semibold text-slate-600 truncate">
            Doctor Meal Ordering
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200 font-mono font-bold shrink-0">
          <span>₹{balance}</span>
        </div>
      </div>

      {placedOrderInfo ? (
        /* Order Placed Success View inside Mobile Screen */
        <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 text-center space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          
          <div className="space-y-1">
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold">
              Card Debited • Order Confirmed
            </span>
            <h3 className="text-base font-bold text-slate-900 pt-1">
              Order #{placedOrderInfo.orderNumber}
            </h3>
            <p className="text-xs text-slate-600">
              Your meal from <span className="font-semibold text-slate-800">{placedOrderInfo.restaurantName}</span> is being prepared.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-1 text-xs">
            <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span className="font-semibold text-slate-700">Delivery Destination:</span>
            </div>
            <p className="text-teal-900 font-medium pl-5 text-[11px]">{placedOrderInfo.deliveryLocation}</p>
          </div>

          {/* Card Receipt Summary */}
          <div className="p-3 rounded-xl bg-teal-50/80 border border-teal-200 text-left space-y-1.5 text-xs">
            <div className="flex justify-between items-center pb-1.5 border-b border-teal-200/60">
              <span className="text-teal-900 font-bold">Paid with F2 RuPay Card</span>
              <span className="font-mono font-bold text-teal-900">•••• {placedOrderInfo.cardLast4}</span>
            </div>
            <div className="flex justify-between text-slate-600 text-[11px]">
              <span>Amount Debited:</span>
              <span className="font-mono font-bold text-slate-900">₹{placedOrderInfo.totalAmount}</span>
            </div>
            <div className="flex justify-between text-slate-600 text-[11px]">
              <span>Estimated Arrival:</span>
              <span className="font-semibold text-teal-800">{placedOrderInfo.estimatedDeliveryMins} mins</span>
            </div>
            <div className="flex justify-between text-slate-600 text-[11px]">
              <span>Remaining F2 Wallet Balance:</span>
              <span className="font-mono font-bold text-emerald-700">₹{balance}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={() => setDoctorStep('SCREEN_6_HISTORY')}
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-98"
            >
              <span>View in Audit Ledger</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPlacedOrderInfo(null)}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
            >
              Order Another Meal
            </button>
          </div>
        </div>
      ) : (
        /* Main Food Ordering Browsing Flow */
        <div className="space-y-3.5">
          
          {/* Top Info Banner */}
          <div className="p-3 rounded-2xl bg-teal-800 text-white shadow-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-teal-300" />
                <span className="text-xs font-bold">Doctor Meal & Coffee Ordering</span>
              </div>
              <span className="text-[9px] font-bold bg-teal-700 px-2 py-0.5 rounded-full text-teal-100 border border-teal-600">
                Section 17(2) Tax-Free
              </span>
            </div>
            <p className="text-[11px] text-teal-100 leading-snug">
              Order directly to your OT, ICU or Doctors' Rest Suite using your ₹{balance} corporate grant.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search protein bowls, coffee, keto meals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Provider Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {[
              { id: 'ALL', label: 'All Providers' },
              { id: 'Swiggy', label: 'Swiggy Gourmet' },
              { id: 'Zomato', label: 'Zomato 24/7' },
              { id: 'Hospital Express', label: 'Hospital Express' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPlatform(p.id as any)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap text-[11px] font-bold transition-all shrink-0 ${
                  selectedPlatform === p.id
                    ? 'bg-teal-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Delivery Location Quick Dropdown */}
          <div className="p-3 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                <span>Hospital Drop-off Location</span>
              </label>
              <span className="text-[9px] text-teal-700 font-semibold">Instant Hand-off</span>
            </div>
            
            <select
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
              className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 outline-none focus:border-teal-600"
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
                placeholder="Specify Ward, Room or Bed Number..."
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                className="w-full p-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 outline-none"
              />
            )}
          </div>

          {/* Restaurant & Meal Items List */}
          <div className="space-y-3">
            {filteredRestaurants.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center text-slate-500 text-xs space-y-1">
                <Utensils className="w-8 h-8 mx-auto text-slate-300" />
                <p className="font-semibold text-slate-700">No matching meals found</p>
                <p className="text-[11px] text-slate-400">Try searching for a different item or switch provider tab.</p>
              </div>
            ) : (
              filteredRestaurants.map((rest) => (
                <div 
                  key={rest.id}
                  className="rounded-2xl bg-white border border-slate-200 p-3.5 space-y-3 shadow-2xs"
                >
                  {/* Restaurant Header */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase shrink-0 ${
                          rest.platform === 'Swiggy'
                            ? 'bg-orange-100 text-orange-800'
                            : rest.platform === 'Zomato'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-teal-100 text-teal-800'
                        }`}>
                          {rest.platform}
                        </span>
                        <h4 className="font-bold text-slate-900 text-xs truncate">
                          {rest.name}
                        </h4>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5 truncate">
                        {rest.cuisine} • <span className="text-teal-700 font-semibold">{rest.distanceStr}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] shrink-0">
                      <span className="flex items-center gap-0.5 font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        {rest.rating}
                      </span>
                      <span className="flex items-center gap-0.5 text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200 text-[10px] font-medium">
                        <Clock className="w-2.5 h-2.5 text-teal-600" />
                        {rest.deliveryTimeMins}
                      </span>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-2">
                    {rest.items.map((item) => {
                      const qty = getItemQuantityInCart(item.id);
                      return (
                        <div 
                          key={item.id}
                          className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-200/80 flex items-center justify-between gap-2.5 hover:border-teal-200 transition-all"
                        >
                          <div className="space-y-0.5 min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className={`w-3 h-3 border flex items-center justify-center p-0.5 rounded-xs shrink-0 ${
                                item.isVeg ? 'border-emerald-600' : 'border-rose-600'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                                }`} />
                              </span>
                              <h5 className="font-bold text-slate-900 text-xs truncate">{item.name}</h5>
                              {item.badge && (
                                <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                                  {item.badge}
                                </span>
                              )}
                            </div>

                            <p className="text-[10px] text-slate-500 line-clamp-1">{item.description}</p>
                            
                            <div className="flex items-center gap-2 pt-0.5">
                              <span className="font-mono font-bold text-slate-900 text-xs">
                                ₹{item.price}
                              </span>
                              {item.calories && (
                                <span className="inline-flex items-center gap-0.5 text-[9px] text-slate-400 font-medium">
                                  <Flame className="w-2.5 h-2.5 text-amber-500" />
                                  {item.calories}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="shrink-0">
                            {qty > 0 ? (
                              <div className="flex items-center gap-1 bg-teal-50 border border-teal-300 rounded-lg p-0.5">
                                <button
                                  onClick={() => handleRemoveItem(item.id)}
                                  className="w-5 h-5 rounded bg-white text-teal-800 hover:bg-teal-100 flex items-center justify-center shadow-2xs"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-mono font-bold text-xs text-teal-900 px-1">
                                  {qty}
                                </span>
                                <button
                                  onClick={() => handleAddItem(rest, item)}
                                  className="w-5 h-5 rounded bg-white text-teal-800 hover:bg-teal-100 flex items-center justify-center shadow-2xs"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleAddItem(rest, item)}
                                className="px-2.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-2xs flex items-center gap-1 transition-all active:scale-95"
                              >
                                <Plus className="w-3 h-3" />
                                <span>Add</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              ))
            )}
          </div>

          {/* Floating Mobile Cart Bar (When Items in Cart) */}
          {cart.length > 0 && (
            <div className="fixed bottom-14 left-0 right-0 max-w-[420px] mx-auto px-3 z-30 pointer-events-auto">
              <div className="p-3 rounded-2xl bg-slate-900 text-white shadow-xl border border-slate-700 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-teal-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {totalItemCount}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold font-mono">
                      ₹{totalOrderAmount} <span className="text-[10px] text-slate-300 font-sans font-normal">(inc. fee)</span>
                    </div>
                    <div className="text-[10px] text-teal-300 truncate">
                      {cart[0]?.restaurantName}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setIsCartSheetOpen(true)}
                    className="px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-all active:scale-95"
                  >
                    <span>View Cart & Pay</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Slide-Up / Expandable Mobile Cart Sheet */}
          <AnimatePresence>
            {isCartSheetOpen && (
              <div className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-2xs flex items-end justify-center">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="w-full max-w-[420px] bg-white rounded-t-3xl p-4 space-y-3.5 max-h-[85vh] overflow-y-auto shadow-2xl border-t border-slate-200"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-teal-600" />
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Doctor Meal Cart ({totalItemCount})
                      </h4>
                    </div>
                    <button
                      onClick={() => setIsCartSheetOpen(false)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Cart Items List */}
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {cart.map((c) => (
                      <div key={c.item.id} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
                        <div className="min-w-0 flex-1 pr-2">
                          <div className="font-semibold text-slate-800 truncate">{c.item.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">₹{c.item.price} × {c.quantity}</div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono font-bold text-slate-900 text-xs">
                            ₹{c.item.price * c.quantity}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleRemoveItem(c.item.id)}
                              className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200"
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

                  {/* Delivery Location Confirmation */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700">
                      <Truck className="w-3.5 h-3.5 text-teal-600" />
                      <span>Delivery Target:</span>
                    </div>
                    <p className="text-[11px] text-teal-900 font-medium pl-4">
                      {customLocation.trim() || deliveryLocation}
                    </p>
                  </div>

                  {/* Doctor Shift Notes */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 block">
                      Instructions for Courier:
                    </label>
                    <input
                      type="text"
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder="e.g. Leave with nurse station"
                      className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 outline-none focus:border-teal-600"
                    />
                  </div>

                  {/* Bill Breakdown */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                    <div className="flex justify-between text-slate-600 text-[11px]">
                      <span>Items Subtotal</span>
                      <span className="font-mono font-bold">₹{cartSubtotal}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 text-[11px]">
                      <span>Hospital Delivery Fee</span>
                      <span className="font-mono">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                    </div>
                    <div className="flex justify-between text-slate-900 font-bold pt-1.5 border-t border-slate-200">
                      <span>Total to Pay</span>
                      <span className="font-mono text-teal-800 font-extrabold text-sm">₹{totalOrderAmount}</span>
                    </div>
                  </div>

                  {/* Virtual Card Payment Method Badge */}
                  <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-teal-900">
                        <CreditCard className="w-3.5 h-3.5 text-teal-700" />
                        <span>F2 RuPay Virtual Card</span>
                      </div>
                      <span className="font-mono text-teal-800 font-semibold text-[11px]">•••• {card?.cardNumber.slice(-4)}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-teal-700">
                      <span>Available Benefit Balance:</span>
                      <span className="font-mono font-bold">₹{balance}</span>
                    </div>
                  </div>

                  {orderError && (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-1.5">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{orderError}</span>
                    </div>
                  )}

                  {/* Checkout Button */}
                  <button
                    onClick={handleExecuteCheckout}
                    disabled={isCheckingOut || totalOrderAmount > balance || card?.isFrozen || !card?.onlineTxnsEnabled}
                    className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98 ${
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
                      <span>Online Txns Disabled</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Pay ₹{totalOrderAmount} with F2 Card</span>
                      </>
                    )}
                  </button>

                  <div className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1 pb-1">
                    <ShieldCheck className="w-3 h-3 text-teal-600" />
                    <span>Section 17(2) Tax-Free Food Perquisite</span>
                  </div>

                </motion.div>
              </div>
            )}
          </AnimatePresence>

        </div>
      )}

    </div>
  );
};
