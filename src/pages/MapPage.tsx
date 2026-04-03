import React from 'react'
import { motion } from 'framer-motion'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api-client'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Compass, Star, ArrowRight, MapPin, Layers } from 'lucide-react'
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
    html: `<div style="background-color: ${color}; width: 36px; height: 36px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 15px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; color: white;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
    </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18]
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
        <Skeleton className="h-[70vh] w-full rounded-4xl" />
      </div>
    )
  }
  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-700">
      <header className="space-y-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-display font-bold">Map Intelligence</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Real-time visualization of Aegean pressure systems and spot alignment.
          </p>
        </div>
        <Badge variant="outline" className="w-fit px-4 py-1.5 gap-2 border-primary/20 bg-primary/5 text-primary">
          <Layers className="h-4 w-4" /> {spots.length} Nodes Online
        </Badge>
      </header>
      <div className="h-[70vh] w-full rounded-4xl overflow-hidden border border-border shadow-2xl relative z-0 glass-panel">
        <MapContainer
          center={[37.9, 24.5]}
          zoom={6}
          style={{ height: '100%', width: '100%', background: '#0f172a' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {spots.map((spot) => (
            <Marker
              key={spot.id}
              position={[spot.lat, spot.lng]}
              icon={createCustomIcon(spot.aiInsight.idealSport)}
            >
              <Popup className="aether-popup" minWidth={320}>
                <div className="p-4 space-y-4 bg-card text-card-foreground rounded-2xl border border-border shadow-2xl backdrop-blur-md">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Badge className="bg-primary/20 text-primary border-none text-[9px] uppercase font-bold tracking-widest px-2 py-0.5">
                          {spot.region}
                        </Badge>
                      </div>
                      <h3 className="font-display font-bold text-xl leading-tight">{spot.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Compass className="h-3.5 w-3.5" />
                        Best: <span className="text-foreground font-medium">{spot.bestDirection}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center shrink-0">
                      <div className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Rating</div>
                      <Badge className="bg-accent text-white border-none text-sm font-bold px-2 py-1 h-10 w-10 flex items-center justify-center rounded-xl shadow-lg shadow-accent/20">
                        {spot.generalRating}
                      </Badge>
                    </div>
                  </div>
                  <div className="h-28 w-full bg-secondary/50 rounded-xl overflow-hidden p-2 border border-border/50">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={spot.forecast.slice(0, 12)}>
                        <defs>
                          <linearGradient id={`colorWind-${spot.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={getSportColor(spot.aiInsight.idealSport)} stopOpacity={0.3}/>
                            <stop offset="95%" stopColor={getSportColor(spot.aiInsight.idealSport)} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="windSpeed"
                          stroke={getSportColor(spot.aiInsight.idealSport)}
                          fill={`url(#colorWind-${spot.id})`}
                          strokeWidth={3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Top Rec</span>
                      <span className="text-sm font-bold text-foreground">{spot.aiInsight.idealSport}</span>
                    </div>
                    <Button size="sm" variant="default" className="h-9 px-4 text-xs font-bold rounded-xl shadow-sm" asChild>
                      <Link to={`/spot/${spot.id}`}>
                        View Detail <ArrowRight className="ml-2 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Windsurf', color: '#0ea5e9' },
          { label: 'Kitesurf', color: '#f97316' },
          { label: 'Wingfoil', color: '#8b5cf6' },
          { label: 'Surf', color: '#10b981' }
        ].map(item => (
          <motion.div 
            key={item.label} 
            whileHover={{ y: -2 }}
            className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/40 border border-border/50 backdrop-blur-sm"
          >
            <div className="h-4 w-4 rounded-full shadow-inner" style={{ backgroundColor: item.color }} />
            <span className="text-sm font-semibold">{item.label} Primary</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}