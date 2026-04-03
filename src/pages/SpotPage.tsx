import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Wind,
  Navigation,
  Sparkles,
  Activity,
  MapPin,
  Waves,
  RefreshCw,
  Info,
  ShieldCheck,
  Users,
  Anchor,
  Phone,
  ExternalLink,
  Target
} from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api-client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import type { Spot } from '@shared/types'
export function SpotPage() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const { data: spot, isLoading, error } = useQuery({
    queryKey: ['spot', id],
    queryFn: () => api<Spot>(`/api/spots/${id}`),
    enabled: !!id,
  })
  const { mutate: refreshIntelligence, isPending: isAnalyzing } = useMutation({
    mutationFn: () => api<Spot>(`/api/spots/${id}/analyze`, { method: 'POST' }),
    onSuccess: (newData) => {
      queryClient.setQueryData(['spot', id], newData)
    }
  })
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        <Skeleton className="h-10 w-32" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="aspect-[21/9] w-full rounded-3xl" />
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-[300px] w-full rounded-xl" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>
        </div>
      </div>
    )
  }
  if (error || !spot) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <h2 className="text-3xl font-display font-bold">Spot Lost at Sea</h2>
        <p className="text-muted-foreground">We couldn't find the intelligence for this location.</p>
        <Button asChild>
          <Link to="/explore">Return to Explorer</Link>
        </Button>
      </div>
    )
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
      <nav className="flex items-center justify-between">
        <Button variant="ghost" asChild className="-ml-4">
          <Link to="/explore">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Explorer
          </Link>
        </Button>
        <div className="flex gap-2">
           <Badge variant="outline" className="border-accent/40 text-accent bg-accent/5">
            {spot.difficulty} Level
          </Badge>
          <Badge variant="outline" className="border-primary/40 text-primary bg-primary/5 hidden sm:flex">
            Live Analysis Active
          </Badge>
        </div>
      </nav>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
          <header className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="aspect-[21/9] rounded-3xl overflow-hidden relative shadow-2xl"
            >
              <img src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8 md:p-12">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <MapPin className="h-5 w-5" />
                    <span className="font-medium text-lg text-white/90">{spot.location}</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-none tracking-tight">{spot.name}</h1>
                </div>
              </div>
            </motion.div>
          </header>
          {/* AI Insight Card */}
          <Card className={cn(
            "glass-panel border-primary/20 transition-all duration-500 shadow-xl",
            isAnalyzing && "animate-pulse opacity-70"
          )}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl font-display font-bold">AI Intelligence Analysis</CardTitle>
                  <p className="text-sm text-muted-foreground">Synthesized from global meteorological models</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refreshIntelligence()}
                disabled={isAnalyzing}
                className="rounded-full gap-2 border-primary/20 hover:bg-primary/5"
              >
                <RefreshCw className={cn("h-4 w-4", isAnalyzing && "animate-spin")} />
                {isAnalyzing ? "Thinking..." : "Sync Intel"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-2xl font-medium leading-relaxed italic text-foreground font-display">
                "{spot.aiInsight.summary}"
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="bg-accent/10 px-4 py-2 rounded-2xl border border-accent/20">
                  <span className="text-xs text-accent uppercase font-bold block mb-1">Prime Window</span>
                  <span className="text-lg font-bold">{spot.aiInsight.timeframe}</span>
                </div>
                <div className="bg-primary/10 px-4 py-2 rounded-2xl border border-primary/20">
                  <span className="text-xs text-primary uppercase font-bold block mb-1">Best Sport</span>
                  <span className="text-lg font-bold">{spot.aiInsight.idealSport}</span>
                </div>
                <div className="bg-secondary/50 px-4 py-2 rounded-2xl border border-border">
                   <span className="text-xs text-muted-foreground uppercase font-bold block mb-1">Recommended Gear</span>
                   <span className="text-lg font-bold">
                    {spot.bestGear.find(g => g.sport.toLowerCase().includes(spot.aiInsight.idealSport.toLowerCase().slice(0, 4)))?.sizeRange || "Standard"}
                   </span>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Practical Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card/50 border-white/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Activity className="h-4 w-4" /> Practical Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Skill Required</span>
                  <Badge variant="outline" className="border-accent/40">{spot.difficulty}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Crowd Density</span>
                  <Badge variant="outline" className="border-primary/40">{spot.crowd}</Badge>
                </div>
                <div className="space-y-2 pt-2">
                  <span className="text-sm block font-medium">Launch Area</span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{spot.launchArea}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-white/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> Facilities & Safety
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {spot.facilities.map((f, i) => (
                    <Badge key={i} variant="secondary" className="bg-secondary/50 px-3 py-1">{f}</Badge>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  <span className="text-sm block font-medium">Pro Tips</span>
                  <ul className="space-y-1">
                    {spot.tips.map((tip, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2 italic">
                        <span className="text-primary mt-1">•</span> {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Location Intelligence (Map) */}
          <Card className="overflow-hidden border-border shadow-lg">
            <CardHeader className="bg-secondary/20">
              <CardTitle className="text-lg flex items-center gap-2">
                <Navigation className="h-5 w-5 text-primary" />
                Location Intelligence
              </CardTitle>
            </CardHeader>
            <div className="h-[400px] w-full bg-muted flex items-center justify-center relative">
              <iframe
                title="Spot Location"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY_HERE&center=${spot.lat},${spot.lng}&zoom=14&maptype=satellite`}
                className="absolute inset-0 grayscale-[20%]"
                allowFullScreen
              ></iframe>
              {/* Fallback Overlay for Demo */}
              <div className="absolute inset-0 bg-black/5 pointer-events-none" />
              <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur p-2 rounded-lg border shadow-sm text-[10px] uppercase font-bold tracking-widest">
                Lat: {spot.lat} | Lng: {spot.lng}
              </div>
            </div>
          </Card>
          {/* 24-Hour Forecast Chart */}
          <Card className="bg-card border-border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-primary" />
                24-Hour Meteorological Flow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={spot.forecast}>
                    <defs>
                      <linearGradient id="colorWind" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorGust" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} unit="kt" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                      itemStyle={{ fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="gust" stroke="#f97316" fillOpacity={1} fill="url(#colorGust)" strokeWidth={3} name="Gusts" />
                    <Area type="monotone" dataKey="windSpeed" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorWind)" strokeWidth={3} name="Wind Speed" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        <aside className="space-y-6">
          <Card className="glass-panel sticky top-24 border-white/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-accent" />
                Performance Matrix
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {Object.entries(spot.sportRatings).map(([sport, rating]) => (
                <div key={sport} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="capitalize font-semibold text-muted-foreground">{sport}</span>
                    <span className="font-bold text-lg">{rating}/10</span>
                  </div>
                  <Progress value={rating * 10} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="bg-card shadow-xl border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Anchor className="h-5 w-5 text-primary" />
                Nearby Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {spot.schoolInfo.length > 0 ? spot.schoolInfo.map((school, i) => (
                <div key={i} className="p-4 rounded-xl bg-secondary/30 border border-border group hover:border-primary/40 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{school.name}</h4>
                    <Badge variant="secondary" className="text-[10px]">{school.distanceKm} km</Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    {school.phone && (
                      <a href={`tel:${school.phone}`} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" /> Call
                      </a>
                    )}
                    <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" /> Website
                    </button>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-muted-foreground italic text-center py-4">No schools registered in the immediate vicinity.</p>
              )}
            </CardContent>
          </Card>
          <Card className="bg-accent/5 border-accent/20">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2 text-accent">
                <Info className="h-4 w-4" /> Nautical Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-accent/5">
                <div className="flex items-center gap-3">
                  <Navigation className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">Ideal Direction</span>
                </div>
                <span className="text-sm font-bold">{spot.bestDirection}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-accent/5">
                <div className="flex items-center gap-3">
                  <Waves className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">Water Surface</span>
                </div>
                <span className="text-sm font-bold">Chop / Wave</span>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}