import React, { useState, useContext, useEffect } from 'react';
import { 
  User, MapPin, Package, Heart, Camera, Save, 
  Loader2, Phone, Mail, ShoppingBag, Trash2, ChevronRight 
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

// ලංකාවේ පළාත් සහ දිස්ත්‍රික්ක දත්ත
const locationData = {
    "Western": ["Colombo", "Gampaha", "Kalutara"],
    "Central": ["Kandy", "Matale", "Nuwara Eliya"],
    "Southern": ["Galle", "Matara", "Hambantota"],
    "North Western": ["Kurunegala", "Puttalam"],
    "Sabaragamuwa": ["Ratnapura", "Kegalle"],
    "North Central": ["Anuradhapura", "Polonnaruwa"],
    "Uva": ["Badulla", "Moneragala"],
    "Northern": ["Jaffna", "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya"],
    "Eastern": ["Ampara", "Batticaloa", "Trincomalee"]
};

const UserProfile = () => {
    const { user, login } = useContext(AuthContext); //
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // පෝරමයේ දත්ත කළමනාකරණය
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        streetAddress: user?.streetAddress || '',
        city: user?.city || '',
        district: user?.district || '',
        province: user?.province || '',
        postalCode: user?.postalCode || ''
    });

    // දත්ත පද්ධතියෙන් ලැබෙන විට Update කිරීම
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                streetAddress: user.streetAddress || '',
                city: user.city || '',
                district: user.district || '',
                province: user.province || '',
                postalCode: user.postalCode || '',
            });
        }
    }, [user]);

    // පළාත වෙනස් කරන විට දිස්ත්‍රික්කය Reset කිරීමේ logic එක
    const handleProvinceChange = (province) => {
        setFormData({ ...formData, province: province, district: "" });
    };

    const handleSave = async () => {
        setLoading(true);
        setMessage({ type: '', text: '' });
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/auth/update-profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (res.ok) {
                login(data.user); // Global State එක Update කිරීම
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
            } else {
                setMessage({ type: 'error', text: data.msg || 'Update failed' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Server connection failed' });
        } finally {
            setLoading(false);
            setTimeout(() => setMessage({ type: '', text: '' }), 4000);
        }
    };

    return (
        <div className="min-h-screen bg-[#fcfcfc] pt-28 pb-16 px-4 md:px-8 font-sans">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* --- වම්පස Sidebar එක --- */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center">
                        <div className="relative group">
                            <div className="w-28 h-28 rounded-full border-4 border-blue-50 ring-4 ring-white overflow-hidden shadow-xl transition-transform group-hover:scale-105">
                                {user?.picture ? (
                                    <img 
                                        src={user.picture} 
                                        alt="Profile" 
                                        referrerPolicy="no-referrer" // Cybersecurity අංශයෙන් වැදගත් පියවරක්
                                        className="w-full h-full object-cover" 
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400"><User size={40} /></div>
                                )}
                            </div>
                            <button className="absolute bottom-1 right-1 bg-blue-600 text-white p-2.5 rounded-full shadow-lg hover:bg-blue-700 transition">
                                <Camera size={14} />
                            </button>
                        </div>
                        <h2 className="mt-5 font-black text-xl text-gray-800 text-center tracking-tight truncate w-full">{user?.name}</h2>
                        <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mt-1 mb-8">{user?.email ? 'Verified Member' : 'Guest Account'}</p>
                        
                        <div className="w-full space-y-2">
                            <TabBtn active={activeTab === 'overview'} icon={<User size={18}/>} label="Overview" onClick={() => setActiveTab('overview')} />
                            <TabBtn active={activeTab === 'orders'} icon={<Package size={18}/>} label="Order History" onClick={() => setActiveTab('orders')} />
                            <TabBtn active={activeTab === 'watchlist'} icon={<Heart size={18}/>} label="Watchlist" onClick={() => setActiveTab('watchlist')} />
                        </div>
                    </div>
                </div>

                {/* --- ප්‍රධාන දත්ත ප්‍රදේශය (Main Content) --- */}
                <div className="lg:col-span-9">
                    {message.text && (
                        <div className={`mb-6 p-4 rounded-3xl text-center font-bold animate-in fade-in slide-in-from-top-4 duration-300 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                            {message.text}
                        </div>
                    )}

                    {/* OVERVIEW ටැබ් එක - මෙහි සියලුම විස්තර එක තැනක ඇත */}
                    {activeTab === 'overview' && (
                        <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                                <div>
                                    <h3 className="text-3xl font-black text-gray-800 tracking-tight">Account Overview</h3>
                                    <p className="text-gray-400 mt-1">Manage your personal and delivery information</p>
                                </div>
                                <button onClick={handleSave} disabled={loading} className="w-full md:w-auto bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center justify-center space-x-2 disabled:bg-gray-200">
                                    {loading ? <Loader2 className="animate-spin" size={20}/> : <Save size={20} />}
                                    <span>Save Profile</span>
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                {/* Basic Information */}
                                <InputGroup label="Full Name" icon={<User size={18}/>} value={formData.name} onChange={(val) => setFormData({...formData, name: val})} />
                                <InputGroup label="Email Address" icon={<Mail size={18}/>} value={formData.email} disabled />
                                <InputGroup label="Contact Number" icon={<Phone size={18}/>} value={formData.phone} onChange={(val) => setFormData({...formData, phone: val})} placeholder="07x xxxxxxx" />
                                <InputGroup label="Postal Code" icon={<MapPin size={18}/>} value={formData.postalCode} onChange={(val) => setFormData({...formData, postalCode: val})} placeholder="10100" />

                                <div className="md:col-span-2 border-t border-gray-50 pt-8 mt-4">
                                    <h4 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-3">
                                        <div className="bg-blue-50 p-2 rounded-lg"><MapPin size={20} className="text-blue-600"/></div>
                                        Delivery Address
                                    </h4>
                                </div>

                                <div className="md:col-span-2">
                                    <InputGroup label="Street Address" icon={<MapPin size={18}/>} value={formData.streetAddress} onChange={(val) => setFormData({...formData, streetAddress: val})} placeholder="House No, Street Name" />
                                </div>

                                {/* Province - Cascading Select */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-500 ml-1">Province</label>
                                    <select 
                                        value={formData.province}
                                        onChange={(e) => handleProvinceChange(e.target.value)}
                                        className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl outline-none transition appearance-none cursor-pointer font-medium text-gray-700"
                                    >
                                        <option value="">Select Province</option>
                                        {Object.keys(locationData).map(prov => (
                                            <option key={prov} value={prov}>{prov}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* District - Dynamic Selection */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-500 ml-1">District</label>
                                    <select 
                                        value={formData.district}
                                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                                        disabled={!formData.province}
                                        className={`w-full p-4 border-2 border-transparent rounded-2xl outline-none transition appearance-none font-medium ${!formData.province ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-50 focus:border-blue-500/20 focus:bg-white text-gray-700 pointer-events-auto'}`}
                                    >
                                        <option value="">Select District</option>
                                        {formData.province && locationData[formData.province].map(dist => (
                                            <option key={dist} value={dist}>{dist}</option>
                                        ))}
                                    </select>
                                </div>

                                <InputGroup label="City / Town" icon={<MapPin size={18}/>} value={formData.city} onChange={(val) => setFormData({...formData, city: val})} placeholder="Colombo 07" />
                            </div>
                        </div>
                    )}

                    {/* ORDER HISTORY ටැබ් එක (Placeholder) */}
                    {activeTab === 'orders' && (
                        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 animate-in fade-in duration-500">
                            <h3 className="text-3xl font-black text-gray-800 mb-8 tracking-tight">Purchase History</h3>
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="bg-gray-50 p-6 rounded-full mb-4 text-gray-300"><ShoppingBag size={48}/></div>
                                <p className="text-gray-500 font-bold">No orders found yet</p>
                                <p className="text-gray-400 text-sm mt-1">Your recent purchases will appear here.</p>
                                <button onClick={() => window.location.href = '/shop'} className="mt-6 text-blue-600 font-bold flex items-center gap-1 hover:gap-2 transition-all">Start Shopping <ChevronRight size={18}/></button>
                            </div>
                        </div>
                    )}

                    {/* WATCHLIST ටැබ් එක (Placeholder) */}
                    {activeTab === 'watchlist' && (
                        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 animate-in fade-in duration-500">
                            <h3 className="text-3xl font-black text-gray-800 mb-8 tracking-tight">Your Wishlist</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <p className="col-span-full text-center text-gray-400 py-20 italic">You haven't added any items to your watchlist yet.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Helper Components (Reusable UI) ---
const TabBtn = ({ active, icon, label, onClick }) => (
    <button onClick={onClick} className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 font-bold tracking-tight ${active ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 scale-105' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}>
        {icon} <span className="text-[15px]">{label}</span>
    </button>
);

const InputGroup = ({ label, icon, value, onChange, disabled, placeholder }) => (
    <div className="space-y-2">
        <label className="block text-[13px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center text-gray-300">{icon}</div>
            <input 
                type="text" 
                value={value} 
                onChange={(e) => onChange && onChange(e.target.value)}
                disabled={disabled}
                placeholder={placeholder}
                className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-transparent outline-none transition font-medium ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-50' : 'bg-gray-50 focus:bg-white focus:border-blue-500/20 text-gray-700'}`}
            />
        </div>
    </div>
);

export default UserProfile;