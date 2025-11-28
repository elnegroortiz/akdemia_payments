import React, { useState } from 'react';
import { MetricCardProps } from '../../types';
import { 
  Users, AlertCircle, TrendingUp, TrendingDown, Calendar, Clock, CheckCircle, 
  Calculator, X, ArrowRight, DollarSign, CreditCard, Banknote, Phone, Mail 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend 
} from 'recharts';

// --- MOCK DATA ---

// Datos principales
const debtEvolutionData = [
  { name: 'Ene', vigente: 45000, vencida: 8000 },
  { name: 'Feb', vigente: 46000, vencida: 12000 },
  { name: 'Mar', vigente: 42000, vencida: 15000 },
  { name: 'Abr', vigente: 48000, vencida: 11000 },
  { name: 'May', vigente: 40000, vencida: 18000 },
  { name: 'Jun', vigente: 38000, vencida: 22000 },
];

const debtByConceptData = [
  { name: 'Colegiaturas (1 mes)', value: 65, color: '#0EA5E9' },
  { name: 'Matrículas (1-12 meses)', value: 25, color: '#F59E0B' },
  { name: 'Otros Servicios', value: 10, color: '#10B981' },
];

// Datos Detalle: Deuda Vencida (Antigüedad)
const agingDebtData = [
  { range: '1-30 Días', amount: 85000 },
  { range: '31-60 Días', amount: 45000 },
  { range: '61-90 Días', amount: 30000 },
  { range: '+90 Días', amount: 25420 },
];

// Datos Detalle: Recaudación (Métodos de Pago)
const paymentMethodsData = [
  { name: 'Transferencia', value: 55, color: '#0EA5E9' },
  { name: 'Tarjeta Crédito/Débito', value: 30, color: '#10B981' },
  { name: 'Efectivo', value: 15, color: '#F59E0B' },
];

// Datos Detalle: Próximos Vencimientos (Deuda Vigente)
const upcomingMaturities = [
  { date: '15 Jun', concept: 'Colegiatura Junio', amount: 120000 },
  { date: '20 Jun', concept: 'Exámenes Extraordinarios', amount: 15000 },
  { date: '30 Jun', concept: 'Talleres Vespertinos', amount: 8500 },
  { date: '05 Jul', concept: 'Adelanto Inscripción', amount: 45000 },
];

// --- COMPONENTS ---

const StatCard: React.FC<MetricCardProps> = ({ title, value, trend, trendUp, color, icon: Icon, onClick }) => {
  const colorClasses = {
    blue: 'bg-brand-blue',
    red: 'bg-brand-red',
    yellow: 'bg-brand-yellow',
    green: 'bg-brand-green',
  };

  const textColors = {
    blue: 'text-brand-blue',
    red: 'text-brand-red',
    yellow: 'text-brand-yellow',
    green: 'text-brand-green',
  };

  const bgColors = {
    blue: 'bg-brand-blue/10',
    red: 'bg-brand-red/10',
    yellow: 'bg-brand-yellow/10',
    green: 'bg-brand-green/10',
  };

  const trendColorClass = trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  const TrendIcon = trendUp ? TrendingUp : TrendingDown;

  return (
    <div 
      onClick={onClick}
      className={`
        bg-white p-6 rounded-xl border border-slate-100 shadow-sm 
        transition-all duration-200 
        ${onClick ? 'cursor-pointer hover:shadow-md hover:scale-[1.02] active:scale-[0.98]' : ''}
      `}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${bgColors[color]}`}>
          <Icon size={24} className={textColors[color]} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${trendColorClass}`}>
          <TrendIcon size={12} />
          {trend}
        </span>
        <span className="text-slate-400 text-xs">vs mes anterior</span>
      </div>
      {onClick && (
        <div className="mt-4 pt-3 border-t border-slate-50 flex justify-end">
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1 group-hover:text-brand-blue transition-colors">
            Ver detalles <ArrowRight size={12} />
          </span>
        </div>
      )}
    </div>
  );
};

// --- MODAL COMPONENT ---

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  color: 'blue' | 'red' | 'yellow' | 'green';
  children: React.ReactNode;
}

const DetailModal: React.FC<ModalProps> = ({ isOpen, onClose, title, color, children }) => {
  if (!isOpen) return null;

  const headerColors = {
    blue: 'border-brand-blue text-brand-blue',
    red: 'border-brand-red text-brand-red',
    yellow: 'border-brand-yellow text-brand-yellow',
    green: 'border-brand-green text-brand-green',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className={`px-6 py-4 border-b-2 flex justify-between items-center bg-slate-50 ${headerColors[color]}`}>
          <h2 className="text-xl font-bold flex items-center gap-2">
             {title}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- MAIN VIEW ---

export const DashboardView: React.FC = () => {
  const [showFormulas, setShowFormulas] = useState(false);
  const [selectedKpi, setSelectedKpi] = useState<string | null>(null);

  // Render content based on selected KPI
  const renderKpiDetail = () => {
    switch (selectedKpi) {
      case 'overdue_debt':
        return (
          <DetailModal 
            isOpen={true} 
            onClose={() => setSelectedKpi(null)} 
            title="Análisis de Deuda Vencida" 
            color="red"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Chart: Antigüedad de Saldos */}
              <div>
                <h4 className="text-lg font-semibold text-slate-800 mb-4">Antigüedad de Saldos</h4>
                <div className="h-64 bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={agingDebtData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" hide />
                      <YAxis dataKey="range" type="category" width={80} tick={{fontSize: 12}} />
                      <Tooltip cursor={{fill: 'transparent'}} />
                      <Bar dataKey="amount" fill="#EF4444" radius={[0, 4, 4, 0]} barSize={30} label={{ position: 'right', fill: '#64748b', fontSize: 12, formatter: (val: number) => `$${val.toLocaleString()}` }} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-100">
                  <p className="text-sm text-red-800 font-medium flex items-center gap-2">
                    <AlertCircle size={16} />
                    Acción Recomendada:
                  </p>
                  <p className="text-xs text-red-600 mt-1">
                    Se recomienda iniciar proceso de cobranza extrajudicial para los 15 estudiantes en el rango de +90 días.
                  </p>
                </div>
              </div>

              {/* List: Top Debtors */}
              <div>
                <h4 className="text-lg font-semibold text-slate-800 mb-4">Top 5 Morosidad Crítica</h4>
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-medium">
                      <tr>
                        <th className="px-4 py-3">Estudiante</th>
                        <th className="px-4 py-3 text-right">Monto</th>
                        <th className="px-4 py-3 text-center">Días</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { name: 'Ricardo Gómez', amount: 12500, days: 120 },
                        { name: 'Valeria Silva', amount: 8400, days: 95 },
                        { name: 'Juan P. Medina', amount: 6200, days: 45 },
                        { name: 'Andrea Torres', amount: 5800, days: 32 },
                        { name: 'Luis Hernández', amount: 4100, days: 35 },
                      ].map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-medium text-slate-700">{item.name}</td>
                          <td className="px-4 py-3 text-right font-bold text-slate-800">${item.amount.toLocaleString()}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.days > 90 ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                              {item.days} días
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button className="w-full mt-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium rounded-lg transition-colors text-sm">
                  Ver Lista Completa
                </button>
              </div>
            </div>
          </DetailModal>
        );

      case 'current_debt':
        return (
          <DetailModal 
            isOpen={true} 
            onClose={() => setSelectedKpi(null)} 
            title="Proyección de Deuda Vigente" 
            color="blue"
          >
             <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                      <p className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">Por Cobrar (7 días)</p>
                      <p className="text-2xl font-bold text-slate-800">$125,000</p>
                   </div>
                   <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Por Cobrar (Mes)</p>
                      <p className="text-2xl font-bold text-slate-800">$420,100</p>
                   </div>
                   <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                      <p className="text-green-600 text-xs font-bold uppercase tracking-wider mb-1">Tasa de Cobro Estimada</p>
                      <p className="text-2xl font-bold text-slate-800">92%</p>
                   </div>
                </div>

                <div>
                   <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                     <Calendar size={20} className="text-brand-blue" />
                     Próximos Vencimientos (30 días)
                   </h4>
                   <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                          <tr>
                            <th className="px-6 py-4 text-left">Fecha Vencimiento</th>
                            <th className="px-6 py-4 text-left">Concepto</th>
                            <th className="px-6 py-4 text-right">Monto Esperado</th>
                            <th className="px-6 py-4 text-center">Estado</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {upcomingMaturities.map((item, idx) => (
                             <tr key={idx} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-mono text-slate-600">{item.date}</td>
                                <td className="px-6 py-4 font-medium text-slate-800">{item.concept}</td>
                                <td className="px-6 py-4 text-right text-slate-600 font-medium">${item.amount.toLocaleString()}</td>
                                <td className="px-6 py-4 text-center">
                                   <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">Pendiente</span>
                                </td>
                             </tr>
                          ))}
                        </tbody>
                      </table>
                   </div>
                </div>
             </div>
          </DetailModal>
        );

      case 'revenue':
        return (
          <DetailModal 
            isOpen={true} 
            onClose={() => setSelectedKpi(null)} 
            title="Detalle de Recaudación" 
            color="green"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
               {/* Pie Chart */}
               <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-4 text-center">Distribución por Método de Pago</h4>
                  <div className="h-64 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={paymentMethodsData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {paymentMethodsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    {/* Center Icon */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-300">
                        <DollarSign size={48} opacity={0.2} />
                    </div>
                  </div>
                  <div className="flex justify-center gap-4 mt-4 flex-wrap">
                     {paymentMethodsData.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                           <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                           <span className="text-sm text-slate-600">{item.name} ({item.value}%)</span>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Stats */}
               <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                     <div className="p-3 rounded-full bg-slate-100 text-slate-600">
                        <Banknote size={24} />
                     </div>
                     <div>
                        <p className="text-sm text-slate-500">Recaudación Efectiva (Hoy)</p>
                        <p className="text-xl font-bold text-slate-800">$12,450.00</p>
                     </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                     <div className="p-3 rounded-full bg-slate-100 text-slate-600">
                        <CreditCard size={24} />
                     </div>
                     <div>
                        <p className="text-sm text-slate-500">Recaudación Digital (Hoy)</p>
                        <p className="text-xl font-bold text-slate-800">$45,200.00</p>
                     </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl border border-green-100 mt-4">
                     <p className="text-sm text-green-800 font-medium">Meta Mensual Alcanzada</p>
                     <div className="w-full bg-green-200 h-2 rounded-full mt-2">
                        <div className="bg-brand-green h-2 rounded-full" style={{width: '85%'}}></div>
                     </div>
                     <p className="text-right text-xs text-green-600 mt-1">85% ($850k / $1M)</p>
                  </div>
               </div>
            </div>
          </DetailModal>
        );

      case 'students_arrears':
        return (
          <DetailModal 
            isOpen={true} 
            onClose={() => setSelectedKpi(null)} 
            title="Gestión de Estudiantes con Mora" 
            color="yellow"
          >
             <div className="space-y-4">
               <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
                 {['Todos (142)', 'Mora Baja <30d (80)', 'Mora Media <90d (47)', 'Mora Alta >90d (15)'].map((tab, i) => (
                    <button key={i} className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap ${i === 0 ? 'bg-brand-yellow text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                       {tab}
                    </button>
                 ))}
               </div>

               <div className="grid gap-4">
                  {[1, 2, 3, 4].map((i) => (
                     <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                           <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-lg">
                              {String.fromCharCode(64 + i)}
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-800">Alumno Apellido {i}</h4>
                              <p className="text-xs text-slate-500">4to Grado • Grupo B</p>
                              <p className="text-xs font-semibold text-brand-red mt-1">Deuda Total: ${1500 * i + 200}</p>
                           </div>
                        </div>
                        
                        <div className="flex items-center gap-2 w-full md:w-auto">
                           <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium rounded-lg transition-colors">
                              <Phone size={14} /> Llamar
                           </button>
                           <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium rounded-lg transition-colors">
                              <Mail size={14} /> Email
                           </button>
                           <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-brand-yellow/10 hover:bg-brand-yellow/20 text-brand-yellow text-xs font-bold rounded-lg transition-colors border border-yellow-200">
                              <AlertCircle size={14} /> Notificar
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
             </div>
          </DetailModal>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Detail Modal Injection */}
      {renderKpiDetail()}

      {/* Date Filter Bar & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-lg shadow-sm border border-slate-100 gap-4">
        <div className="flex items-center gap-2">
           <Calendar size={18} className="text-slate-400" />
           <span className="text-sm font-medium text-slate-600">Periodo Contable: </span>
           <span className="text-sm font-bold text-slate-800">Enero 2024 - Junio 2024</span>
        </div>
        <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setShowFormulas(!showFormulas)}
              className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 border ${showFormulas ? 'bg-slate-100 border-slate-300 text-slate-800' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              <Calculator size={16} />
              {showFormulas ? 'Ocultar Fórmulas' : 'Ver Fórmulas KPI'}
            </button>
            <button className="bg-brand-blue text-white text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-blue-600 transition-colors shadow-sm shadow-brand-blue/30">
              Generar Reporte
            </button>
        </div>
      </div>

      {/* KPI Grid - Financial Focus - CLICKABLE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          id="overdue_debt"
          title="Deuda Vencida Total" 
          value="$185,420" 
          trend="+15%" 
          trendUp={false} 
          color="red" 
          icon={AlertCircle}
          onClick={() => setSelectedKpi('overdue_debt')}
        />
        <StatCard 
          id="current_debt"
          title="Deuda Vigente" 
          value="$420,100" 
          trend="-2%" 
          trendUp={true} 
          color="blue" 
          icon={Clock}
          onClick={() => setSelectedKpi('current_debt')}
        />
        <StatCard 
          id="revenue"
          title="Recaudación Real" 
          value="$850,000" 
          trend="+8.5%" 
          trendUp={true} 
          color="green" 
          icon={CheckCircle}
          onClick={() => setSelectedKpi('revenue')}
        />
        <StatCard 
          id="students_arrears"
          title="Estudiantes con Mora" 
          value="142" 
          trend="+5" 
          trendUp={false} 
          color="yellow" 
          icon={Users}
          onClick={() => setSelectedKpi('students_arrears')}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart: Vencida vs Vigente Evolution */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
             <div>
                <h3 className="text-lg font-bold text-slate-800">Evolución de Cartera</h3>
                <p className="text-sm text-slate-500">Comparativa mensual Deuda Vigente vs Vencida</p>
             </div>
             <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-brand-blue"></span><span className="text-xs text-slate-600 mr-2">Vigente</span>
                <span className="w-3 h-3 rounded-full bg-brand-red"></span><span className="text-xs text-slate-600">Vencida</span>
             </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={debtEvolutionData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                />
                <Bar dataKey="vigente" name="Deuda Vigente" stackId="a" fill="#0EA5E9" radius={[0, 0, 4, 4]} barSize={40} />
                <Bar dataKey="vencida" name="Deuda Vencida" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown by Concept Type */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Composición de Deuda</h3>
          <p className="text-xs text-slate-500 mb-4">Por periodo de vigencia del concepto</p>
          
          <div className="flex-1 min-h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={debtByConceptData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {debtByConceptData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                    <span className="block text-2xl font-bold text-slate-800">100%</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">Total</span>
                </div>
            </div>
          </div>

          <div className="mt-4 space-y-3">
             {debtByConceptData.map((item, idx) => (
               <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0">
                  <span className="flex items-center gap-2 text-slate-600">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                    {item.name}
                  </span>
                  <span className="font-semibold text-slate-800">{item.value}%</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* FORMULA GUIDE SECTION (Toggleable) */}
      {showFormulas && (
        <div className="bg-slate-800 text-white rounded-xl shadow-lg p-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
            <Calculator className="text-brand-blue" />
            <div>
              <h3 className="text-xl font-bold">Guía de Cálculo de KPIs</h3>
              <p className="text-slate-400 text-sm">Lógica financiera aplicada para la determinación de cartera.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* KPI 1: Deuda Vigente */}
            <div className="space-y-3">
              <h4 className="text-brand-blue font-bold flex items-center gap-2">
                1. Deuda Vigente (Sana)
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Suma de los saldos pendientes donde la fecha de vencimiento es igual o posterior a la fecha actual.
              </p>
              <div className="bg-slate-900 p-4 rounded-lg font-mono text-xs sm:text-sm text-emerald-400 border border-slate-700">
                ∑ (Cargo - Abonos) <br/>
                <span className="text-slate-400">donde:</span> Fecha_Vencimiento ≥ Fecha_Actual
              </div>
            </div>

            {/* KPI 2: Deuda Vencida */}
            <div className="space-y-3">
              <h4 className="text-brand-red font-bold flex items-center gap-2">
                2. Deuda Vencida (Mora)
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Suma de los saldos pendientes donde la fecha límite de pago ha pasado.
              </p>
              <div className="bg-slate-900 p-4 rounded-lg font-mono text-xs sm:text-sm text-pink-400 border border-slate-700">
                 ∑ (Cargo - Abonos) <br/>
                 <span className="text-slate-400">donde:</span> Fecha_Vencimiento &lt; Fecha_Actual
              </div>
            </div>

            {/* Logic for Periods */}
            <div className="md:col-span-2 bg-slate-700/50 p-4 rounded-lg border border-slate-600">
              <h4 className="font-bold text-brand-yellow mb-2 text-sm uppercase tracking-wider">Criterio por Tipo de Concepto</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="block font-semibold text-white mb-1">A. Conceptos Mensuales (1 mes)</span>
                  <p className="text-slate-300 text-xs">
                    Ej: Colegiaturas. Se consideran vencidos si no se pagan antes del día de corte del mes corriente (ej. día 10).
                  </p>
                </div>
                <div>
                  <span className="block font-semibold text-white mb-1">B. Conceptos Periódicos (1-N meses)</span>
                  <p className="text-slate-300 text-xs">
                    Ej: Matrículas anuales. Tienen una fecha de vencimiento única establecida al momento del cargo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Table for Overdue Debt */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="bg-red-50 p-2 rounded-lg text-brand-red">
                    <AlertCircle size={20} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-800">Detalle de Cartera Vencida</h3>
                    <p className="text-xs text-slate-500">Conceptos con más de 30 días de mora</p>
                </div>
            </div>
            <button className="text-brand-blue text-sm font-medium hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-blue-100">
                Ver Todo
            </button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                    <tr>
                        <th className="px-6 py-4">Estudiante</th>
                        <th className="px-6 py-4">Concepto</th>
                        <th className="px-6 py-4">Vigencia</th>
                        <th className="px-6 py-4">Vencimiento</th>
                        <th className="px-6 py-4 text-right">Monto</th>
                        <th className="px-6 py-4 text-center">Estado</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-800">Ana García</td>
                        <td className="px-6 py-4 text-slate-600">Colegiatura Marzo</td>
                        <td className="px-6 py-4 text-slate-500">1 Mes</td>
                        <td className="px-6 py-4 text-brand-red font-medium">Hace 5 días</td>
                        <td className="px-6 py-4 text-right font-bold text-slate-800">$1,200.00</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Vencido
                            </span>
                        </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-800">Carlos López</td>
                        <td className="px-6 py-4 text-slate-600">Matrícula Anual 2024</td>
                        <td className="px-6 py-4 text-slate-500">12 Meses</td>
                        <td className="px-6 py-4 text-brand-red font-medium">Hace 15 días</td>
                        <td className="px-6 py-4 text-right font-bold text-slate-800">$4,500.00</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Vencido
                            </span>
                        </td>
                    </tr>
                     <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-800">Sofía Méndez</td>
                        <td className="px-6 py-4 text-slate-600">Servicio Transporte</td>
                        <td className="px-6 py-4 text-slate-500">1 Mes</td>
                        <td className="px-6 py-4 text-brand-red font-medium">Hace 2 días</td>
                        <td className="px-6 py-4 text-right font-bold text-slate-800">$850.00</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Vencido
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};