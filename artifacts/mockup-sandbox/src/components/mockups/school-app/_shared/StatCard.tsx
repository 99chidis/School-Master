import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

export function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  trend, 
  trendValue,
  colorClass = "text-sky-600",
  bgClass = "bg-sky-100"
}: { 
  icon: any, 
  label: string, 
  value: string | number, 
  trend?: 'up' | 'down' | 'neutral', 
  trendValue?: string,
  colorClass?: string,
  bgClass?: string
}) {
  return (
    <Card className="shadow-sm border-slate-200/60 hover:shadow-md transition-all duration-200 bg-white">
      <CardContent className="p-5 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className={`h-12 w-12 rounded-xl ${bgClass} flex items-center justify-center shrink-0`}>
            <Icon className={`h-6 w-6 ${colorClass}`} strokeWidth={2.5} />
          </div>
          {trend && trend !== 'neutral' && (
            <span className={`flex items-center text-[11px] font-semibold px-2 py-1 rounded-full ${
              trend === 'up' ? 'text-emerald-700 bg-emerald-50 border border-emerald-200/50' : 'text-rose-700 bg-rose-50 border border-rose-200/50'
            }`}>
              {trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" strokeWidth={3} /> : <TrendingDown className="h-3 w-3 mr-1" strokeWidth={3} />}
              {trendValue}
            </span>
          )}
          {trend === 'neutral' && trendValue && (
            <span className="flex items-center text-[11px] font-semibold px-2 py-1 rounded-full text-slate-600 bg-slate-100 border border-slate-200/50">
              {trendValue}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}
