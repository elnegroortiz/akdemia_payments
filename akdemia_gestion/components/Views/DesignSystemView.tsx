import React from 'react';

export const DesignSystemView: React.FC = () => {
  return (
    <div className="space-y-12 pb-12 animate-fade-in">
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Sistema de Diseño</h2>
        <p className="text-slate-500 mb-8">
          Guía de estilos base inspirada en la identidad corporativa multicolor.
        </p>

        {/* Colors */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-slate-700 mb-4 border-b pb-2">1. Paleta de Colores</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-brand-blue shadow-lg shadow-brand-blue/30 flex items-end p-3">
                <span className="text-white font-mono text-sm">#0EA5E9</span>
              </div>
              <p className="font-semibold text-slate-700">Azul Primario</p>
              <p className="text-xs text-slate-500">Corporativo, Enlaces, Botones Primarios</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-brand-red shadow-lg shadow-brand-red/30 flex items-end p-3">
                <span className="text-white font-mono text-sm">#EF4444</span>
              </div>
              <p className="font-semibold text-slate-700">Rojo Alerta</p>
              <p className="text-xs text-slate-500">Errores, Deudas, Acciones Destructivas</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-brand-yellow shadow-lg shadow-brand-yellow/30 flex items-end p-3">
                <span className="text-white font-mono text-sm">#F59E0B</span>
              </div>
              <p className="font-semibold text-slate-700">Amarillo Aviso</p>
              <p className="text-xs text-slate-500">Advertencias, Pendientes, Notas</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-brand-green shadow-lg shadow-brand-green/30 flex items-end p-3">
                <span className="text-white font-mono text-sm">#10B981</span>
              </div>
              <p className="font-semibold text-slate-700">Verde Éxito</p>
              <p className="text-xs text-slate-500">Confirmaciones, Pagos al día</p>
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-slate-700 mb-4 border-b pb-2">2. Tipografía (Inter)</h3>
          <div className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">Encabezado H1 - 36px</h1>
              <p className="text-slate-400 text-sm">Usado en títulos principales de página.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Encabezado H2 - 24px</h2>
              <p className="text-slate-400 text-sm">Usado en títulos de sección.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Encabezado H3 - 18px</h3>
              <p className="text-slate-400 text-sm">Usado en tarjetas y subtítulos.</p>
            </div>
            <div>
              <p className="text-base text-slate-600 leading-relaxed">
                Este es un ejemplo de párrafo de cuerpo de texto. La legibilidad es clave en un panel administrativo.
                Usamos colores slate-600 para el texto principal para reducir la fatiga visual comparado con el negro puro.
              </p>
              <p className="text-slate-400 text-sm">Cuerpo regular - 16px</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-slate-700 mb-4 border-b pb-2">3. Componentes de Botón</h3>
          <div className="flex flex-wrap gap-4 mb-4">
            <button className="px-5 py-2.5 bg-brand-blue hover:bg-blue-600 text-white font-medium rounded-lg shadow-sm shadow-blue-500/30 transition-all">
              Primario Azul
            </button>
            <button className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg shadow-sm transition-all">
              Secundario Oscuro
            </button>
            <button className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg shadow-sm transition-all">
              Terciario / Borde
            </button>
            <button className="px-5 py-2.5 bg-brand-red/10 hover:bg-brand-red/20 text-brand-red font-medium rounded-lg transition-all">
              Acción Peligrosa
            </button>
          </div>
        </div>

        {/* Forms */}
        <div>
          <h3 className="text-lg font-semibold text-slate-700 mb-4 border-b pb-2">4. Elementos de Formulario</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Nombre del Alumno</label>
              <input 
                type="text" 
                placeholder="Ej. Juan Pérez" 
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Grado</label>
              <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue bg-white">
                <option>Seleccionar...</option>
                <option>1er Grado</option>
                <option>2do Grado</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
               <label className="flex items-center gap-2 cursor-pointer">
                 <input type="checkbox" className="w-4 h-4 text-brand-blue rounded border-slate-300 focus:ring-brand-blue" checked readOnly />
                 <span className="text-sm text-slate-700">Activar notificaciones para este registro</span>
               </label>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};