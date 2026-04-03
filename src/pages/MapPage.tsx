import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api-client'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Wind, Waves, Compass, Star, ArrowRight } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area } from 'recharts'
import type { Spot } from '@shared/types'
// Fix Leaflet marker icons which break in bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});
const getSportColor = (sport: string): string => {
  switch (sport) {
    case 'Windsurf': return '#0ea5e9'; // Blue
    case 'Kitesurf': return '#f97316'; // Orange
    case 'Wingfoil': return '#8b5cf6'; // Purple
    case 'Surf': return '#10b981'; // Green
    default: return '#64748b';
  }
}
const createCustomIcon = (sport: string): L.DivIcon => {
  const color = getSportColor(sport);
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
}
export function MapPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['spots'],
    queryFn: () => api<{ items: Spot[] }>('/api/spots'),
  })
  const spots = data?.items ?? []
  if (isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <header className="space-y-4">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-6 w-96" />
        </header>
        <Skeleton className="h-[70vh] w-full rounded-3xl" />
      </div>
    )
  }
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold">Map Intelligence</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Visualizing Aegean pressure systems and sport-specific alignment across the archipelago.
        </p>
      </header>
      <div className="h-[70vh] w-full rounded-4xl overflow-hidden border border-white/10 shadow-2xl relative z-0 glass-panel">
        <MapContainer
          center={[38.0, 24.5]}
          zoom={7}
          style={{ height: '100%', width: '100%', background: '#0f172a' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {spots.map((spot) => (
            <Marker
              key={spot.id}
              position={[spot.lat, spot.lng]}
              icon={createCustomIcon(spot.aiInsight.idealSport)}
            >
              <Popup className="aether-popup" minWidth={280}>
                <div className="p-2 space-y-4 bg-slate-900 text-white rounded-xl">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-0.5">
                      <h3 className="font-display font-bold text-lg leading-tight text-white">{spot.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Compass className="h-3 w-3" />
                        {spot.bestDirection}
                      </div>
                    </div>
                    <Badge className="bg-primary/20 text-primary border-none text-xs font-bold px-2 py-0.5">
                      {spot.generalRating}
                    </Badge>
                  </div>
                  <div className="h-20 w-full bg-white/5 rounded-lg overflow-hidden p-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={spot.forecast.slice(0, 12)}>
                        <Area
                          type="monotone"
                          dataKey="windSpeed"
                          stroke={getSportColor(spot.aiInsight.idealSport)}
                          fill={getSportColor(spot.aiInsight.idealSport)}
                          fillOpacity={0.2}
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      AI Suggestion: <span className="text-white">{spot.aiInsight.idealSport}</span>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 px-2 text-xs font-bold hover:bg-white/10 text-white" asChild>
                      <Link to={`/spot/${spot.id}`}>
                        Details <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Windsurf', color: '#0ea5e9' },
          { label: 'Kitesurf', color: '#f97316' },
          { label: 'Wingfoil', color: '#8b5cf6' },
          { label: 'Surf', color: '#10b981' }
        ].map(item => (
          <div key={item.label} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-sm font-semibold">{item.label} Preferred</span>
          </div>
        ))}
      </div>
    </div>
  )
}