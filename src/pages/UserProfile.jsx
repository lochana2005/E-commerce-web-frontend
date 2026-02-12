import React, { useState, useContext, useEffect } from 'react';
import {
    User, MapPin, Package, Heart, Camera, Save,
    Loader2, Phone, Mail, ShoppingBag, ExternalLink, Trash2
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const UserProfile = () => {
    const { user, login } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
            });
        }
    }, [user]);

    const handleSave = async () => {
        setLoading(true);
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
                login(data.user);
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Update failed' });
        } finally {
            setLoading(false);
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] pt-28 pb-12 px-4 md:px-8 font-sans">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* --- Sidebar Navigation --- */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
                        <div className="relative group">
                            <div className="w-28 h-28 rounded-full border-4 border-blue-50 ring-8 ring-white overflow-hidden shadow-lg">
                                {user?.picture ? (
                                    <img src={user.picture} alt="Profile" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600"><User size={40} /></div>
                                )}
                            </div>
                            <button className="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full shadow-md hover:scale-110 transition">
                                <Camera size={14} />
                            </button>
                        </div>
                        <h2 className="mt-4 font-bold text-xl text-gray-800 text-center truncate w-full">{user?.name}</h2>
                        <p className="text-gray-400 text-sm truncate w-full text-center mb-6">{user?.email}</p>

                        <div className="w-full space-y-2">
                            <TabBtn active={activeTab === 'overview'} icon={<User size={18} />} label="Overview" onClick={() => setActiveTab('overview')} />
                            <TabBtn active={activeTab === 'orders'} icon={<Package size={18} />} label="Orders" onClick={() => setActiveTab('orders')} />
                            <TabBtn active={activeTab === 'watchlist'} icon={<Heart size={18} />} label="Watchlist" onClick={() => setActiveTab('watchlist')} />
                        </div>
                    </div>
                </div>

                {/* --- Main Content Area --- */}
                <div className="lg:col-span-9">
                    {message.text && (
                        <div className={`mb-6 p-4 rounded-2xl text-center font-medium animate-in slide-in-from-top duration-300 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700'}`}>
                            {message.text}
                        </div>
                    )}

                    {/* OVERVIEW TAB */}
                    

                    {activeTab === 'overview' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="text-2xl font-bold text-gray-800">Personal & Billing Details</h3>
                                    <button onClick={handleSave} disabled={loading} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center space-x-2 disabled:bg-gray-300">
                                        {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                        <span>Save Profile</span>
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Contact Info */}
                                    <InputGroup label="Full Name" icon={<User size={18} />} value={formData.name} onChange={(val) => setFormData({ ...formData, name: val })} />
                                    <InputGroup label="Contact Number" icon={<Phone size={18} />} value={formData.phone} onChange={(val) => setFormData({ ...formData, phone: val })} placeholder="07x xxxxxxx" />

                                    <div className="md:col-span-2 border-t pt-6 mt-2">
                                        <h4 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                                            <MapPin size={20} className="text-blue-600" /> Shipping Address
                                        </h4>
                                    </div>

                                    {/* Separated Address Fields */}
                                    <div className="md:col-span-2">
                                        <InputGroup label="Street Address" icon={<MapPin size={18} />} value={formData.streetAddress} onChange={(val) => setFormData({ ...formData, streetAddress: val })} placeholder="House No, Street Name" />
                                    </div>
                                    <InputGroup label="City" icon={<MapPin size={18} />} value={formData.city} onChange={(val) => setFormData({ ...formData, city: val })} placeholder="Colombo" />
                                    <InputGroup label="Postal Code" icon={<MapPin size={18} />} value={formData.postalCode} onChange={(val) => setFormData({ ...formData, postalCode: val })} placeholder="10100" />
                                    <InputGroup label="District" icon={<MapPin size={18} />} value={formData.district} onChange={(val) => setFormData({ ...formData, district: val })} placeholder="Colombo" />
                                    <InputGroup label="Province" icon={<MapPin size={18} />} value={formData.province} onChange={(val) => setFormData({ ...formData, province: val })} placeholder="Western" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ORDERS TAB */}
                    {activeTab === 'orders' && (
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 animate-in fade-in duration-500">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Order History</h3>
                            <div className="space-y-4">
                                {/* Placeholder Order */}
                                <div className="p-5 border border-gray-50 bg-gray-50/50 rounded-2xl flex flex-wrap items-center justify-between hover:border-blue-100 transition">
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><ShoppingBag size={24} /></div>
                                        <div>
                                            <p className="font-bold text-gray-800">Order #LX-9942</p>
                                            <p className="text-sm text-gray-400">Placed on Oct 12, 2025</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-blue-600">LKR 12,500.00</p>
                                        <span className="text-[10px] uppercase font-bold px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg">Processing</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* WATCHLIST TAB */}
                    {activeTab === 'watchlist' && (
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 animate-in fade-in duration-500">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Watchlist</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Placeholder Item */}
                                <div className="group relative bg-white border border-gray-100 p-4 rounded-2xl flex items-center space-x-4 hover:shadow-md transition">
                                    <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden shadow-inner">
                                        <div className="w-full h-full bg-slate-200 animate-pulse"></div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-800 group-hover:text-blue-600 transition">Premium Leather Jacket</p>
                                        <p className="text-blue-600 font-bold text-sm">LKR 8,900.00</p>
                                    </div>
                                    <button className="p-2 text-gray-300 hover:text-red-500"><Trash2 size={18} /></button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Helper Components ---
const TabBtn = ({ active, icon, label, onClick }) => (
    <button onClick={onClick} className={`w-full flex items-center space-x-3 p-3.5 rounded-2xl transition-all duration-300 font-medium ${active ? 'bg-blue-600 text-white shadow-blue-200 shadow-lg scale-105' : 'text-gray-500 hover:bg-gray-50'}`}>
        {icon} <span>{label}</span>
    </button>
);

const InputGroup = ({ label, icon, value, onChange, disabled, placeholder }) => (
    <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-500 ml-1">{label}</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center text-gray-400">{icon}</div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                disabled={disabled}
                placeholder={placeholder}
                className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border-none outline-none transition ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:bg-white'}`}
            />
        </div>
    </div>
);

export default UserProfile;