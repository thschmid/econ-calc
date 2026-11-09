import React, { useState, useId } from "react";

// ============================================================================
// INLINE SVG ICONS (Zero external dependencies needed)
// ============================================================================
const Icons = {
  TrendingUp: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  Building: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  Scale: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  ),
  Coins: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  ChevronDown: ({ expanded }) => (
    <svg
      className={`w-5 h-5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  ),
  Info: () => (
    <svg className="w-4 h-4 text-indigo-500 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};

// ============================================================================
// HELPER FORMATTERS
// ============================================================================
const formatCurrency = (val) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(val);

const formatNumber = (val, decimals = 2) =>
  new Intl.NumberFormat("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(val);

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function EconCalc() {
  const [activeTab, setActiveTab] = useState("ped");

  // State for Price Elasticity of Demand (PED)
  const [pedInputs, setPedInputs] = useState({ p1: 10, p2: 12, q1: 100, q2: 80 });

  // State for GDP (Expenditure Approach)
  const [gdpInputs, setGdpInputs] = useState({ c: 14000, i: 3500, g: 4200, x: 2500, m: 3100 });

  // State for Break-Even Point
  const [beInputs, setBeInputs] = useState({ fixedCost: 50000, pricePerUnit: 120, varCostPerUnit: 45 });

  // State for Inflation / Real Value
  const [infInputs, setInfInputs] = useState({ nominalValue: 75000, cpi: 125 });

  // Accordion toggle states for each calculator
  const [showFormula, setShowFormula] = useState({
    ped: true,
    gdp: true,
    be: true,
    inf: true,
  });

  const toggleFormula = (key) => {
    setShowFormula((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = [
    { id: "ped", name: "Elasticity of Demand", icon: Icons.TrendingUp, tag: "Microeconomics" },
    { id: "gdp", name: "GDP Expenditure", icon: Icons.Building, tag: "Macroeconomics" },
    { id: "be", name: "Break-Even Point", icon: Icons.Scale, tag: "Managerial Econ" },
    { id: "inf", name: "Inflation & Real Value", icon: Icons.Coins, tag: "Purchasing Power" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* ------------------------------------------------------------- */}
      {/* TOP NAVBAR                                                    */}
      {/* ------------------------------------------------------------- */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black shadow-md shadow-indigo-200 text-lg">
              E
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">EconCalc</h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                Clear calculations with complete formula breakdowns
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Calculation Engine
            </span>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* MAIN CONTENT AREA                                             */}
      {/* ------------------------------------------------------------- */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Intro Banner */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Economic Formulas, Transparently Solved.
          </h2>
          <p className="text-slate-600 mt-1 text-sm sm:text-base max-w-2xl">
            Input your numbers below. EconCalc automatically runs the numbers and unpacks the complete mathematical
            derivation step by step.
          </p>
        </div>

        {/* Calculator Tab Switcher */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-start p-3.5 sm:p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "bg-white border-indigo-600 ring-2 ring-indigo-500/20 shadow-sm"
                    : "bg-white/60 hover:bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div
                    className={`p-2 rounded-lg ${
                      isSelected ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <Icon />
                  </div>
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isSelected ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {tab.tag}
                  </span>
                </div>
                <span
                  className={`text-sm font-semibold truncate w-full ${
                    isSelected ? "text-slate-900" : "text-slate-700"
                  }`}
                >
                  {tab.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Calculator Panel */}
        <div className="transition-opacity duration-200">
          {activeTab === "ped" && (
            <PEDCalculator
              inputs={pedInputs}
              setInputs={setPedInputs}
              expanded={showFormula.ped}
              onToggle={() => toggleFormula("ped")}
            />
          )}

          {activeTab === "gdp" && (
            <GDPCalculator
              inputs={gdpInputs}
              setInputs={setGdpInputs}
              expanded={showFormula.gdp}
              onToggle={() => toggleFormula("gdp")}
            />
          )}

          {activeTab === "be" && (
            <BreakEvenCalculator
              inputs={beInputs}
              setInputs={setBeInputs}
              expanded={showFormula.be}
              onToggle={() => toggleFormula("be")}
            />
          )}

          {activeTab === "inf" && (
            <InflationCalculator
              inputs={infInputs}
              setInputs={setInfInputs}
              expanded={showFormula.inf}
              onToggle={() => toggleFormula("inf")}
            />
          )}
        </div>
      </main>
    </div>
  );
}

// ============================================================================
// 1. PRICE ELASTICITY OF DEMAND (PED) CALCULATOR
// ============================================================================
function PEDCalculator({ inputs, setInputs, expanded, onToggle }) {
  // Handlers for inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const { p1, p2, q1, q2 } = inputs;

  /* ----------------- MATH LOGIC (Midpoint / Arc Method) ----------------- */
  // Change in Quantity & Average Quantity
  const deltaQ = q2 - q1;
  const avgQ = (q1 + q2) / 2;
  const pctChangeQ = avgQ !== 0 ? (deltaQ / avgQ) * 100 : 0;

  // Change in Price & Average Price
  const deltaP = p2 - p1;
  const avgP = (p1 + p2) / 2;
  const pctChangeP = avgP !== 0 ? (deltaP / avgP) * 100 : 0;

  // Final PED value
  const ped = pctChangeP !== 0 ? pctChangeQ / pctChangeP : 0;
  const absPed = Math.abs(ped);

  // Economic Interpretation
  let elasticityType = "Unit Elastic";
  let badgeColor = "bg-amber-50 text-amber-700 border-amber-200";
  let explanation = "Percentage change in quantity demanded exactly equals percentage change in price.";

  if (absPed > 1) {
    elasticityType = "Elastic (|PED| > 1)";
    badgeColor = "bg-rose-50 text-rose-700 border-rose-200";
    explanation = "Consumers are sensitive to price changes. A 1% increase in price drops demand by more than 1%.";
  } else if (absPed < 1 && absPed > 0) {
    elasticityType = "Inelastic (|PED| < 1)";
    badgeColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
    explanation = "Consumers are relatively insensitive to price changes (essential goods, few substitutes).";
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      <div className="border-b border-slate-100 pb-5 mb-6">
        <h3 className="text-xl font-bold text-slate-900">Price Elasticity of Demand (Midpoint Method)</h3>
        <p className="text-sm text-slate-500 mt-1">
          Measures the responsiveness of the quantity demanded of a good to a change in its price using the standard
          midpoint formula.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Controls */}
        <div className="lg:col-span-6 space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Input Variables</h4>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Initial Price (P₁)"
              name="p1"
              value={inputs.p1}
              onChange={handleChange}
              prefix="$"
              step="0.5"
            />
            <InputField
              label="New Price (P₂)"
              name="p2"
              value={inputs.p2}
              onChange={handleChange}
              prefix="$"
              step="0.5"
            />
            <InputField
              label="Initial Quantity (Q₁)"
              name="q1"
              value={inputs.q1}
              onChange={handleChange}
              suffix="units"
              step="1"
            />
            <InputField
              label="New Quantity (Q₂)"
              name="q2"
              value={inputs.q2}
              onChange={handleChange}
              suffix="units"
              step="1"
            />
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-slate-600 space-y-1">
            <p className="font-semibold text-slate-700">Quick Observation:</p>
            <p>
              • Price changed from ${p1} to ${p2} (
              <span className={deltaP >= 0 ? "text-emerald-600 font-medium" : "text-rose-600 font-medium"}>
                {pctChangeP >= 0 ? "+" : ""}
                {formatNumber(pctChangeP, 1)}%
              </span>
              )
            </p>
            <p>
              • Quantity changed from {q1} to {q2} (
              <span className={deltaQ >= 0 ? "text-emerald-600 font-medium" : "text-rose-600 font-medium"}>
                {pctChangeQ >= 0 ? "+" : ""}
                {formatNumber(pctChangeQ, 1)}%
              </span>
              )
            </p>
          </div>
        </div>

        {/* Output Card */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Calculated Outcome</h4>
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-lg shadow-indigo-950/10">
              <span className="text-xs font-medium uppercase tracking-wider text-indigo-300">Elasticity Coefficient</span>
              <div className="flex items-baseline space-x-3 mt-2">
                <span className="text-4xl sm:text-5xl font-black tracking-tight">{formatNumber(ped, 3)}</span>
                <span className="text-slate-300 text-sm">PED (|e| = {formatNumber(absPed, 3)})</span>
              </div>

              <div className="mt-4 pt-4 border-t border-indigo-800/60 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-300 block">Demand Profile</span>
                  <span className="text-sm font-semibold text-white">{elasticityType}</span>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${badgeColor}`}>
                  {absPed > 1 ? "Price Sensitive" : absPed < 1 ? "Inelastic Demand" : "Neutral"}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-2">{explanation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion: Step-by-Step Breakdown */}
      <FormulaSection expanded={expanded} onToggle={onToggle}>
        <div className="space-y-6">
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">1. The Formal Equation</h5>
            <div className="bg-white p-4 rounded-lg border border-slate-200 font-mono text-sm text-slate-800 overflow-x-auto">
              PED = [ (Q₂ - Q₁) / ((Q₁ + Q₂) / 2) ] ÷ [ (P₂ - P₁) / ((P₁ + P₂) / 2) ]
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">2. Variable Definitions</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <strong className="text-slate-900">Q₁ &amp; Q₂:</strong> Initial demand ({q1}) and New demand ({q2})
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <strong className="text-slate-900">P₁ &amp; P₂:</strong> Initial price (${p1}) and New price (${p2})
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <strong className="text-slate-900">ΔQ / Q_avg:</strong> Relative change in quantity
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <strong className="text-slate-900">ΔP / P_avg:</strong> Relative change in price
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              3. Step-by-Step Substitution
            </h5>
            <div className="bg-white p-4 rounded-lg border border-slate-200 text-xs sm:text-sm font-mono text-slate-700 space-y-2">
              <p>
                <strong>Step A (Quantity % Change):</strong>
                <br />
                ΔQ = {q2} - {q1} = {deltaQ}
                <br />
                Q_avg = ({q1} + {q2}) / 2 = {avgQ}
                <br />% ΔQ = {deltaQ} / {avgQ} = {formatNumber(pctChangeQ / 100, 4)} ({formatNumber(pctChangeQ, 2)}%)
              </p>
              <hr className="border-slate-200" />
              <p>
                <strong>Step B (Price % Change):</strong>
                <br />
                ΔP = {p2} - {p1} = {deltaP}
                <br />
                P_avg = ({p1} + {p2}) / 2 = {avgP}
                <br />% ΔP = {deltaP} / {avgP} = {formatNumber(pctChangeP / 100, 4)} ({formatNumber(pctChangeP, 2)}%)
              </p>
              <hr className="border-slate-200" />
              <p>
                <strong>Step C (Division):</strong>
                <br />
                PED = {formatNumber(pctChangeQ / 100, 4)} ÷ {formatNumber(pctChangeP / 100, 4)} ={" "}
                <span className="font-bold text-indigo-600">{formatNumber(ped, 4)}</span>
              </p>
            </div>
          </div>
        </div>
      </FormulaSection>
    </div>
  );
}

// ============================================================================
// 2. GDP (EXPENDITURE APPROACH) CALCULATOR
// ============================================================================
function GDPCalculator({ inputs, setInputs, expanded, onToggle }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const { c, i, g, x, m } = inputs;

  /* ----------------- MATH LOGIC (C + I + G + (X - M)) ----------------- */
  const netExports = x - m;
  const gdp = c + i + g + netExports;

  const cShare = gdp !== 0 ? (c / gdp) * 100 : 0;
  const iShare = gdp !== 0 ? (i / gdp) * 100 : 0;
  const gShare = gdp !== 0 ? (g / gdp) * 100 : 0;
  const nxShare = gdp !== 0 ? (netExports / gdp) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      <div className="border-b border-slate-100 pb-5 mb-6">
        <h3 className="text-xl font-bold text-slate-900">Gross Domestic Product (Expenditure Approach)</h3>
        <p className="text-sm text-slate-500 mt-1">
          Calculates total economic output by summing Consumption, Investment, Government Spending, and Net Exports.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Controls */}
        <div className="lg:col-span-6 space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Expenditure Components ($B)</h4>
          <div className="space-y-3">
            <InputField
              label="Personal Consumption Expenditures (C)"
              name="c"
              value={inputs.c}
              onChange={handleChange}
              prefix="$"
              step="100"
            />
            <InputField
              label="Gross Private Domestic Investment (I)"
              name="i"
              value={inputs.i}
              onChange={handleChange}
              prefix="$"
              step="100"
            />
            <InputField
              label="Government Consumption & Gross Investment (G)"
              name="g"
              value={inputs.g}
              onChange={handleChange}
              prefix="$"
              step="100"
            />
            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="Exports (X)"
                name="x"
                value={inputs.x}
                onChange={handleChange}
                prefix="$"
                step="50"
              />
              <InputField
                label="Imports (M)"
                name="m"
                value={inputs.m}
                onChange={handleChange}
                prefix="$"
                step="50"
              />
            </div>
          </div>
        </div>

        {/* Output Card */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Calculated Outcome</h4>
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-lg shadow-indigo-950/10">
              <span className="text-xs font-medium uppercase tracking-wider text-indigo-300">Total Output (GDP)</span>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="text-4xl sm:text-5xl font-black tracking-tight">{formatCurrency(gdp)}</span>
                <span className="text-slate-300 text-sm">Billion</span>
              </div>

              <div className="mt-5 pt-4 border-t border-indigo-800/60 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Net Exports (X - M):</span>
                  <span className={`font-semibold ${netExports >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {netExports >= 0 ? `Trade Surplus: +${formatCurrency(netExports)}` : `Trade Deficit: -${formatCurrency(Math.abs(netExports))}`}
                  </span>
                </div>

                {/* Contribution Progress Bar */}
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden flex">
                  <div style={{ width: `${Math.max(0, cShare)}%` }} className="bg-indigo-500" title="Consumption" />
                  <div style={{ width: `${Math.max(0, iShare)}%` }} className="bg-emerald-500" title="Investment" />
                  <div style={{ width: `${Math.max(0, gShare)}%` }} className="bg-amber-500" title="Government" />
                  <div
                    style={{ width: `${Math.max(0, nxShare)}%` }}
                    className="bg-sky-400"
                    title="Net Exports"
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-300 font-mono">
                  <span>C: {formatNumber(cShare, 1)}%</span>
                  <span>I: {formatNumber(iShare, 1)}%</span>
                  <span>G: {formatNumber(gShare, 1)}%</span>
                  <span>NX: {formatNumber(nxShare, 1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion: Step-by-Step Breakdown */}
      <FormulaSection expanded={expanded} onToggle={onToggle}>
        <div className="space-y-6">
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">1. The Formal Equation</h5>
            <div className="bg-white p-4 rounded-lg border border-slate-200 font-mono text-sm text-slate-800">
              GDP = C + I + G + (X - M)
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">2. Variable Definitions</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <strong className="text-slate-900">C:</strong> Household final consumption
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <strong className="text-slate-900">I:</strong> Gross business capital investment
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <strong className="text-slate-900">G:</strong> Government consumption &amp; infrastructure spend
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <strong className="text-slate-900">NX (X - M):</strong> Net Exports (Gross Exports minus Imports)
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              3. Step-by-Step Substitution
            </h5>
            <div className="bg-white p-4 rounded-lg border border-slate-200 text-xs sm:text-sm font-mono text-slate-700 space-y-2">
              <p>
                <strong>Step A (Calculate Net Exports):</strong>
                <br />
                NX = Exports ({x}) - Imports ({m}) = <span className="font-semibold">{netExports}</span>
              </p>
              <hr className="border-slate-200" />
              <p>
                <strong>Step B (Aggregate Sum):</strong>
                <br />
                GDP = {c} + {i} + {g} + ({netExports})
                <br />
                GDP = <span className="font-bold text-indigo-600">{formatCurrency(gdp)} Billion</span>
              </p>
            </div>
          </div>
        </div>
      </FormulaSection>
    </div>
  );
}

// ============================================================================
// 3. BREAK-EVEN POINT CALCULATOR
// ============================================================================
function BreakEvenCalculator({ inputs, setInputs, expanded, onToggle }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const { fixedCost, pricePerUnit, varCostPerUnit } = inputs;

  /* ----------------- MATH LOGIC (Break Even) ----------------- */
  const contributionMargin = pricePerUnit - varCostPerUnit;
  const cmRatio = pricePerUnit > 0 ? (contributionMargin / pricePerUnit) * 100 : 0;

  // Protect against division by zero or negative margin
  const isValid = contributionMargin > 0;
  const breakEvenUnits = isValid ? Math.ceil(fixedCost / contributionMargin) : 0;
  const breakEvenRevenue = breakEvenUnits * pricePerUnit;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      <div className="border-b border-slate-100 pb-5 mb-6">
        <h3 className="text-xl font-bold text-slate-900">Break-Even Analysis (Units &amp; Revenue)</h3>
        <p className="text-sm text-slate-500 mt-1">
          Identifies the sales volume where total revenue precisely equals total fixed and variable costs (Zero Profit /
          Zero Loss).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Controls */}
        <div className="lg:col-span-6 space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Cost &amp; Pricing Data</h4>
          <InputField
            label="Total Fixed Costs (FC)"
            name="fixedCost"
            value={inputs.fixedCost}
            onChange={handleChange}
            prefix="$"
            step="1000"
          />
          <InputField
            label="Selling Price Per Unit (P)"
            name="pricePerUnit"
            value={inputs.pricePerUnit}
            onChange={handleChange}
            prefix="$"
            step="5"
          />
          <InputField
            label="Variable Cost Per Unit (VC)"
            name="varCostPerUnit"
            value={inputs.varCostPerUnit}
            onChange={handleChange}
            prefix="$"
            step="5"
          />

          {!isValid && (
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs">
              <Icons.Info /> Selling price must exceed variable cost per unit to generate a positive contribution
              margin.
            </div>
          )}
        </div>

        {/* Output Card */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Calculated Outcome</h4>
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-lg shadow-indigo-950/10">
              <span className="text-xs font-medium uppercase tracking-wider text-indigo-300">Break-Even Volume</span>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="text-4xl sm:text-5xl font-black tracking-tight">
                  {isValid ? formatNumber(breakEvenUnits, 0) : "—"}
                </span>
                <span className="text-slate-300 text-sm">Units</span>
              </div>

              <div className="mt-5 pt-4 border-t border-indigo-800/60 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-300 block">Required Revenue</span>
                  <span className="text-lg font-bold text-white">
                    {isValid ? formatCurrency(breakEvenRevenue) : "—"}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-300 block">Unit Contrib. Margin</span>
                  <span className="text-lg font-bold text-emerald-400">
                    {formatCurrency(contributionMargin)} ({formatNumber(cmRatio, 1)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion: Step-by-Step Breakdown */}
      <FormulaSection expanded={expanded} onToggle={onToggle}>
        <div className="space-y-6">
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">1. The Formal Equation</h5>
            <div className="bg-white p-4 rounded-lg border border-slate-200 font-mono text-sm text-slate-800 space-y-1">
              <div>Break-Even Units (Q) = Fixed Costs / (Price - Variable Cost)</div>
              <div className="text-xs text-slate-500">Break-Even Revenue = Break-Even Units × Price</div>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">2. Variable Definitions</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <strong className="text-slate-900">Fixed Costs (FC):</strong> Overhead costs independent of output
                (${formatNumber(fixedCost, 0)})
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <strong className="text-slate-900">Price (P):</strong> Revenue generated per unit sold ($
                {formatNumber(pricePerUnit, 2)})
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <strong className="text-slate-900">Variable Cost (VC):</strong> Direct expense per produced unit ($
                {formatNumber(varCostPerUnit, 2)})
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <strong className="text-slate-900">Contribution Margin (CM):</strong> Amount each sale contributes to FC
                (P - VC)
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              3. Step-by-Step Substitution
            </h5>
            <div className="bg-white p-4 rounded-lg border border-slate-200 text-xs sm:text-sm font-mono text-slate-700 space-y-2">
              <p>
                <strong>Step A (Calculate Contribution Margin):</strong>
                <br />
                CM = ${pricePerUnit} - ${varCostPerUnit} ={" "}
                <span className="font-semibold text-emerald-600">${contributionMargin} per unit</span>
              </p>
              <hr className="border-slate-200" />
              <p>
                <strong>Step B (Calculate Units Needed):</strong>
                <br />
                Q = ${fixedCost} / ${contributionMargin} ={" "}
                <span className="font-bold text-indigo-600">
                  {isValid ? `${formatNumber(fixedCost / contributionMargin, 2)} ≈ ${breakEvenUnits} units` : "N/A"}
                </span>
              </p>
              <hr className="border-slate-200" />
              <p>
                <strong>Step C (Dollar Volume):</strong>
                <br />
                Revenue = {breakEvenUnits} units × ${pricePerUnit} ={" "}
                <span className="font-bold text-indigo-600">{formatCurrency(breakEvenRevenue)}</span>
              </p>
            </div>
          </div>
        </div>
      </FormulaSection>
    </div>
  );
}

// ============================================================================
// 4. INFLATION / REAL VS. NOMINAL VALUE CALCULATOR
// ============================================================================
function InflationCalculator({ inputs, setInputs, expanded, onToggle }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const { nominalValue, cpi } = inputs;

  /* ----------------- MATH LOGIC (Real Value = Nominal / (CPI / 100)) ----------------- */
  const priceIndexFactor = cpi > 0 ? cpi / 100 : 1;
  const realValue = priceIndexFactor !== 0 ? nominalValue / priceIndexFactor : 0;
  const purchasingPowerLoss = nominalValue > 0 ? ((nominalValue - realValue) / nominalValue) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      <div className="border-b border-slate-100 pb-5 mb-6">
        <h3 className="text-xl font-bold text-slate-900">Inflation: Real vs. Nominal Value</h3>
        <p className="text-sm text-slate-500 mt-1">
          Adjusts current dollar figures against the Consumer Price Index (Base Year = 100) to isolate actual purchasing
          power.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Controls */}
        <div className="lg:col-span-6 space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Price &amp; Wage Figures</h4>
          <InputField
            label="Nominal Value (Current Dollars)"
            name="nominalValue"
            value={inputs.nominalValue}
            onChange={handleChange}
            prefix="$"
            step="1000"
          />
          <InputField
            label="Consumer Price Index (Base Year = 100)"
            name="cpi"
            value={inputs.cpi}
            onChange={handleChange}
            step="1"
          />

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-slate-600 space-y-1">
            <p className="font-semibold text-slate-700">CPI Context:</p>
            <p>
              A CPI of {cpi} indicates general price levels have increased by{" "}
              <strong className="text-indigo-600">{formatNumber(cpi - 100, 1)}%</strong> relative to the benchmark
              base year (100).
            </p>
          </div>
        </div>

        {/* Output Card */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Calculated Outcome</h4>
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-lg shadow-indigo-950/10">
              <span className="text-xs font-medium uppercase tracking-wider text-indigo-300">
                Real (Constant) Value
              </span>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="text-4xl sm:text-5xl font-black tracking-tight">{formatCurrency(realValue)}</span>
              </div>

              <div className="mt-5 pt-4 border-t border-indigo-800/60 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-300 block">Purchasing Power Adjustment</span>
                  <span className="text-sm font-semibold text-white">
                    {purchasingPowerLoss >= 0 ? "Erosion of Value" : "Gain in Value"}
                  </span>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                    purchasingPowerLoss >= 0
                      ? "bg-rose-50 text-rose-700 border-rose-200"
                      : "bg-emerald-50 text-emerald-700 border-emerald-200"
                  }`}
                >
                  {purchasingPowerLoss >= 0 ? "-" : "+"}
                  {formatNumber(Math.abs(purchasingPowerLoss), 1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion: Step-by-Step Breakdown */}
      <FormulaSection expanded={expanded} onToggle={onToggle}>
        <div className="space-y-6">
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">1. The Formal Equation</h5>
            <div className="bg-white p-4 rounded-lg border border-slate-200 font-mono text-sm text-slate-800">
              Real Value = Nominal Value ÷ (CPI ÷ 100)
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">2. Variable Definitions</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <strong className="text-slate-900">Nominal Value:</strong> Money value unadjusted for inflation ($
                {formatNumber(nominalValue, 2)})
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <strong className="text-slate-900">CPI:</strong> Current Consumer Price Index measure ({cpi})
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <strong className="text-slate-900">Deflator Ratio:</strong> CPI / 100 ({formatNumber(priceIndexFactor, 3)})
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <strong className="text-slate-900">Real Value:</strong> Purchasing power in base year terms
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              3. Step-by-Step Substitution
            </h5>
            <div className="bg-white p-4 rounded-lg border border-slate-200 text-xs sm:text-sm font-mono text-slate-700 space-y-2">
              <p>
                <strong>Step A (Convert CPI into Price Multiplier):</strong>
                <br />
                Price Factor = {cpi} / 100 = {formatNumber(priceIndexFactor, 3)}
              </p>
              <hr className="border-slate-200" />
              <p>
                <strong>Step B (Deflate Nominal Value):</strong>
                <br />
                Real Value = ${formatNumber(nominalValue, 2)} ÷ {formatNumber(priceIndexFactor, 3)}
                <br />
                Real Value = <span className="font-bold text-indigo-600">{formatCurrency(realValue)}</span>
              </p>
            </div>
          </div>
        </div>
      </FormulaSection>
    </div>
  );
}

// ============================================================================
// REUSABLE UI PRIMITIVES
// ============================================================================

/**
 * Standardized Input Field with custom labels and prefix/suffix wrappers
 */
function InputField({ label, name, value, onChange, prefix, suffix, step = "any" }) {
  const generatedId = useId();
  const inputId = `${generatedId}-${name}`;

  return (
    <div>
      <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700 mb-1.5">
        {label}
      </label>
      <div className="relative rounded-lg border border-slate-300 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/20 bg-white transition-all">
        {prefix && (
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 font-medium text-sm pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          id={inputId}
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          step={step}
          className={`w-full py-2 text-sm text-slate-900 bg-transparent rounded-lg focus:outline-none font-mono ${
            prefix ? "pl-7" : "pl-3"
          } ${suffix ? "pr-12" : "pr-3"}`}
        />
        {suffix && (
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 text-xs pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Expandable Accordion component specifically tailored for mathematical proofs
 */
function FormulaSection({ expanded, onToggle, children }) {
  return (
    <div className="mt-8 pt-6 border-t border-slate-100">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-800 transition-colors"
      >
        <span className="flex items-center text-sm font-semibold text-slate-800">
          <Icons.Info />
          {expanded ? "Hide Mathematical Formula & Steps" : "Show Mathematical Formula & Steps"}
        </span>
        <Icons.ChevronDown expanded={expanded} />
      </button>

      {expanded && (
        <div className="mt-4 p-5 bg-slate-50/70 border border-slate-200/80 rounded-xl space-y-4 animate-in fade-in duration-200">
          {children}
        </div>
      )}
    </div>
  );
}