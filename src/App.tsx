import React, { useState, useEffect } from 'react';
import { 
  Home, 
  ReceiptText, 
  Package, 
  Users, 
  Database, 
  Settings, 
  Search, 
  Bell, 
  LogOut, 
  TrendingUp, 
  Clock, 
  UserPlus, 
  ShieldAlert, 
  Download, 
  Trash2, 
  UploadCloud, 
  FileUp,
  Info,
  Router,
  CheckCircle2,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type View = 'dashboard' | 'database';

interface Order {
  id: string;
  client: string;
  total: number;
  status: string;
}

interface Backup {
  id: number;
  date: string;
  time: string;
  size: string;
  user: string;
}

interface Stats {
  salesToday: number;
  pendingOrders: number;
  newClients: number;
  dbSize: string;
  totalRecords: number;
}

// --- Components ---

const Sidebar = ({ currentView, setView }: { currentView: View, setView: (v: View) => void }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Inicio', icon: Home },
    { id: 'ventas', label: 'Ventas', icon: ReceiptText },
    { id: 'inventario', label: 'Inventario', icon: Package },
    { id: 'clientes', label: 'Clientes', icon: Users },
  ];

  return (
    <aside className="w-72 bg-primary text-white flex flex-col h-screen sticky top-0 shrink-0 shadow-xl z-20">
      <div className="p-6 flex items-center gap-3">
        <div className="size-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden border border-white/10">
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsNYAPgxNi3-F0w_PkIDtyJHhpmoJR55FEFp2BiqAIVEFinQrkaxsc6S9w77MtIRsBnQlb9EaGeA2O7gbkMviqT_XCFIUeB9Fw_4QOEsVj8BYHfJ3LQhcePtCVfthQhR4yyRK6jUNjkmwVcdMxziwHP04ijAyab1BLW8vCgbvC90I6aJt7wWLTpIpyR3idk4wiq_IDfeWg5W7Z6TP-YGJ-9QzO0I0VNFPD9gsZ_3_wqZOjbF5wSwZY0kGRmsl_VNYBLjBHzUbBuQG8" 
            alt="Logo"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <h1 className="text-base font-bold leading-none">Florería Bautista</h1>
          <p className="text-white/60 text-[10px] mt-1 uppercase tracking-wider font-semibold">Panel Administrativo</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => item.id === 'dashboard' && setView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              currentView === item.id 
                ? 'bg-white/15 text-white shadow-lg shadow-black/10' 
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}

        <div className="pt-6 pb-2">
          <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Sistemas</p>
        </div>

        <button
          onClick={() => setView('database')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            currentView === 'database'
              ? 'bg-white/15 text-white shadow-lg shadow-black/10'
              : 'text-white/70 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Database size={20} className={currentView === 'database' ? 'text-blue-400' : 'text-blue-400/70'} />
          <span className="text-sm font-medium">Administración BD</span>
        </button>
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="w-full flex items-center gap-3 p-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-colors">
          <div className="size-8 rounded-full bg-white/10 flex items-center justify-center">
            <Settings size={16} />
          </div>
          <span className="text-sm font-medium">Configuración</span>
        </button>
      </div>
    </aside>
  );
};

const Header = ({ title }: { title: string }) => {
  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold text-primary">{title}</h2>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative w-64 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            className="w-full bg-slate-100 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all" 
            placeholder="Buscar registros..." 
            type="text" 
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-slate-100 text-slate-600 relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="h-8 w-px bg-slate-200 mx-1"></div>
          <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1 rounded-lg transition-colors">
            <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shadow-sm">AB</div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-700 leading-none">Admin Bautista</p>
              <p className="text-[10px] text-slate-400 font-medium mt-1">Administrador</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const MetricCard = ({ label, value, trend, icon: Icon, color }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col hover:shadow-md transition-shadow"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2.5 rounded-xl ${color.bg}`}>
        <Icon className={color.text} size={22} />
      </div>
      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${trend.startsWith('+') ? 'text-green-600 bg-green-50' : 'text-amber-600 bg-amber-50'}`}>
        {trend}
      </span>
    </div>
    <p className="text-sm font-medium text-slate-500">{label}</p>
    <p className="text-2xl font-bold mt-1 text-slate-900">{value}</p>
  </motion.div>
);

const DashboardView = ({ stats, orders, loading }: { stats: Stats | null, orders: Order[], loading: boolean }) => {
  if (loading || !stats) {
    return (
      <div className="h-full flex items-center justify-center p-20">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Resumen General</h1>
        <p className="text-slate-500 mt-1">Bienvenido al panel de control de Florería Bautista.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          label="Ventas del día" 
          value={`$${stats.salesToday.toLocaleString()}`} 
          trend="+15%" 
          icon={ReceiptText} 
          color={{ bg: 'bg-green-50', text: 'text-green-600' }} 
        />
        <MetricCard 
          label="Pedidos pendientes" 
          value={stats.pendingOrders.toString()} 
          trend="-2%" 
          icon={Clock} 
          color={{ bg: 'bg-amber-50', text: 'text-amber-600' }} 
        />
        <MetricCard 
          label="Clientes nuevos" 
          value={stats.newClients.toString()} 
          trend="+5%" 
          icon={UserPlus} 
          color={{ bg: 'bg-blue-50', text: 'text-blue-600' }} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Database className="text-primary" size={20} />
              </div>
              <h3 className="font-bold text-slate-900">Estado de base de datos</h3>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full border border-green-100">
              <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-wider">En línea</span>
            </div>
          </div>
          <div className="p-8 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-black text-slate-900 leading-none">120</span>
                    <span className="text-xl font-bold text-slate-400 mb-1">MB</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                    Almacenamiento total ocupado por registros y multimedia del sistema.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '45%' }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-primary h-full"
                    ></motion.div>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">45% de capacidad utilizada</p>
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-500">Registros totales</span>
                  <span className="font-bold text-slate-900">{stats.totalRecords.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-500">Última sincronización</span>
                  <span className="text-sm font-semibold text-slate-700">Hace 2 min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-500">Backups diarios</span>
                  <span className="text-sm font-semibold text-slate-700">Habilitado</span>
                </div>
                <button className="w-full mt-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group">
                  <Info size={18} />
                  <span>Ver detalles</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
            <h4 className="text-lg font-bold text-slate-900">Pedidos Recientes</h4>
            <button className="text-xs font-bold text-primary hover:underline">Ver todos</button>
          </div>
          <div className="p-2 flex-1 overflow-y-auto max-h-[400px]">
            <div className="space-y-1">
              {orders.map((order) => {
                const statusColors: any = {
                  'Entregado': 'text-green-600 bg-green-50',
                  'Pendiente': 'text-amber-600 bg-amber-50',
                  'En camino': 'text-blue-600 bg-blue-50',
                  'Cancelado': 'text-red-600 bg-red-50'
                };
                return (
                  <div key={order.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white transition-colors">
                        <ReceiptText size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{order.client}</p>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{order.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">${order.total.toFixed(2)}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[order.status] || 'bg-slate-100 text-slate-500'}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="p-4 bg-slate-50/50 border-t border-slate-50">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium">Total hoy: {orders.length} pedidos</span>
              <span className="font-bold text-green-600">+12% vs ayer</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Soporte e Infraestructura</h2>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full">
            <div className="size-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
              <Router className="text-slate-500" size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Servidor Principal Node-01</h4>
              <p className="text-xs text-slate-500 mt-0.5">Uptime: 14 días, 2 horas</p>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-bold bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">Configurar</button>
            <button className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-bold bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors">Logs</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DatabaseAdminView = ({ backups, loading, onCreateBackup, onDeleteBackup }: { backups: Backup[], loading: boolean, onCreateBackup: () => void, onDeleteBackup: (id: number) => void }) => {
  return (
    <div className="p-8 space-y-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-black text-primary tracking-tight">Administración de base de datos</h1>
        <div className="flex items-center gap-2 text-red-600">
          <ShieldAlert size={16} />
          <p className="text-xs font-bold uppercase tracking-widest">Funciones solo para administrador</p>
        </div>
      </div>

      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <TrendingUp size={20} className="text-primary" /> Estado General
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <p className="text-slate-500 text-sm font-medium">Tamaño de BD</p>
            <p className="text-primary text-3xl font-bold">120 MB</p>
            <div className="flex items-center gap-1 text-emerald-600 text-sm font-bold">
              <TrendingUp size={14} /> +2.4% este mes
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <p className="text-slate-500 text-sm font-medium">Registros Totales</p>
            <p className="text-primary text-3xl font-bold">45,280</p>
            <div className="flex items-center gap-1 text-emerald-600 text-sm font-bold">
              <UserPlus size={14} /> 15% crecimiento
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <p className="text-slate-500 text-sm font-medium">Salud del Sistema</p>
            <p className="text-emerald-500 text-3xl font-bold">En línea</p>
            <div className="flex items-center gap-1 text-slate-400 text-sm font-bold">
              <CheckCircle2 size={14} /> 100% Uptime
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-800 font-bold mb-6">Ventas últimos 7 días</p>
          <div className="h-48 w-full flex items-end gap-3">
            {[40, 65, 55, 85, 70, 95, 80].map((h, i) => (
              <div key={i} className="flex-1 group relative">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className={`w-full rounded-t-lg transition-all duration-300 ${i === 5 ? 'bg-accent shadow-lg shadow-accent/20' : 'bg-primary/20 group-hover:bg-primary'}`}
                ></motion.div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {h}%
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-widest px-1">
            {['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'].map(d => <span key={d}>{d}</span>)}
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Clock size={20} className="text-primary" /> Respaldos
          </h2>
          <button 
            onClick={onCreateBackup}
            disabled={loading}
            className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : <UserPlus size={16} />}
            Crear respaldo ahora
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/80">
              <tr>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Hora</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tamaño</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Usuario</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {backups.map((b, i) => (
                <tr key={b.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-700">{b.date}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{b.time}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{b.size}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{b.user}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="text-primary p-2 hover:bg-primary/10 rounded-lg transition-colors"><Download size={18} /></button>
                    <button 
                      onClick={() => onDeleteBackup(b.id)}
                      className="text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {backups.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400 text-sm italic">No hay respaldos disponibles.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <UploadCloud size={20} className="text-primary" /> Exportar Datos
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Descarga copias de seguridad de tablas específicas en formato CSV para análisis externo.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: 'Ventas', icon: ReceiptText, href: '/api/export/sales' },
              { label: 'Inventario', icon: Package, href: '#' },
              { label: 'Clientes', icon: Users, href: '#' }
            ].map((btn) => (
              <a 
                key={btn.label} 
                href={btn.href}
                download={btn.href !== '#' ? `${btn.label.toLowerCase()}.csv` : undefined}
                className="flex items-center justify-center gap-2 bg-slate-50 hover:bg-primary hover:text-white transition-all py-3.5 rounded-xl text-sm font-bold border border-slate-200 group"
              >
                <btn.icon size={16} className="group-hover:scale-110 transition-transform" />
                {btn.label}
              </a>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <FileUp size={20} className="text-primary" /> Importar Datos
          </h2>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tipo de dato a importar</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
                <option>Seleccionar categoría...</option>
                <option>Inventario de Flores</option>
                <option>Lista de Proveedores</option>
                <option>Catálogo de Precios</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Archivo CSV</label>
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer">
                <UploadCloud className="text-slate-400" size={32} />
                <button className="bg-primary text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all">
                  Seleccionar archivo CSV
                </button>
                <p className="text-[10px] text-slate-400 font-medium">Tamaño máximo: 10MB</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="pt-8 pb-4 text-center text-[10px] text-slate-400 font-medium uppercase tracking-widest border-t border-slate-100">
        © 2023 Florería Bautista. Todos los derechos reservados. Sistema de Gestión Interna v2.4.0
      </footer>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<View>('dashboard');
  const [stats, setStats] = useState<Stats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [backups, setBackups] = useState<Backup[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, ordersRes, backupsRes] = await Promise.all([
        fetch('/api/stats'),
        fetch('/api/orders/recent'),
        fetch('/api/backups')
      ]);
      
      const [statsData, ordersData, backupsData] = await Promise.all([
        statsRes.json(),
        ordersRes.json(),
        backupsRes.json()
      ]);

      setStats(statsData);
      setOrders(ordersData);
      setBackups(backupsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateBackup = async () => {
    try {
      setActionLoading(true);
      const res = await fetch('/api/backups', { method: 'POST' });
      if (res.ok) {
        const backupsRes = await fetch('/api/backups');
        const backupsData = await backupsRes.json();
        setBackups(backupsData);
      }
    } catch (error) {
      console.error("Error creating backup:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteBackup = async (id: number) => {
    try {
      const res = await fetch(`/api/backups/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBackups(backups.filter(b => b.id !== id));
      }
    } catch (error) {
      console.error("Error deleting backup:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f6f6]">
      <Sidebar currentView={view} setView={setView} />
      
      <main className="flex-1 flex flex-col min-w-0">
        <Header title={view === 'dashboard' ? 'Dashboard' : 'Administración de BD'} />
        
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {view === 'dashboard' ? (
                <DashboardView stats={stats} orders={orders} loading={loading} />
              ) : (
                <DatabaseAdminView 
                  backups={backups} 
                  loading={actionLoading} 
                  onCreateBackup={handleCreateBackup}
                  onDeleteBackup={handleDeleteBackup}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
