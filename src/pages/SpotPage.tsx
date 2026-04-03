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
  Loader2
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
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api-client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import type { Spot } from '@shared/types'
export function SpotPage() {
  const { id } = useParams<{ id: string }>()
  const { data: spot, isLoading, error } = useQuery({
    queryKey: ['spot', id],
    queryFn: () => api<Spot>(`/api/spots/${id}`),
    enabled: !!id,
  })
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground font-display text-xl">Consulting the oracles...</p>
        </div>
      </div>
    )
  }
  if (error || !spot) {
    return (
      <div className="py-20 text-center space-y-6">
        <h2 className="text-3xl font-display font-bold">Spot Lost at Sea</h2>
        <p className="text-muted-foreground">We couldn't find the intelligence for this location.</p>
        <Button asChild>
          <Link to="/explore">Return to Explorer</Link>
        </Button>
      </div>
    )
  }
  return (
    <div className="space-y-10 pb-20">
      <nav className="flex items-center justify-between">
        <Button variant="ghost" asChild className="-ml-4">
          <Link to="/explore">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Explorer
          </Link>
        </Button>
        <Badge variant="outline" className="border-accent/40 text-accent bg-accent/5">
          Live Analysis Active
        </Badge>
      </nav>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <header className="space-y-4">
            <div className="aspect-[21/9] rounded-3xl overflow-hidden relative shadow-2xl">
              <img src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8 md:p-12">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <MapPin className="h-5 w-5" />
                    <span className="font-medium text-lg text-white/80">{spot.location}</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-none">{spot.name}</h1>
                </div>
              </div>
            </div>
          </header>
          <Card className="glass-panel border-primary/20">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl font-display font-bold">AI Intelligence Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">Synthesized from 4 meteorological models</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-2xl font-medium leading-relaxed italic text-foreground">
                "{spot.aiInsight.summary}"
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="bg-accent/10 px-4 py-2 rounded-2xl border border-accent/20">
                  <span className="text-xs text-accent uppercase font-bold block">Prime Window</span>
                  <span className="text-lg font-bold">{spot.aiInsight.timeframe}</span>
                </div>
                <div className="bg-primary/10 px-4 py-2 rounded-2xl border border-primary/20">
                  <span className="text-xs text-primary uppercase font-bold block">Best Sport</span>
                  <span className="text-lg font-bold">{spot.aiInsight.idealSport}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-primary" />
                24-Hour Forecast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
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
                    />
                    <Area type="monotone" dataKey="gust" stroke="#f97316" fillOpacity={1} fill="url(#colorGust)" strokeWidth={2} name="Gusts" />
                    <Area type="monotone" dataKey="windSpeed" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorWind)" strokeWidth={2} name="Wind Speed" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        <aside className="space-y-6">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>Sport Ratings</CardTitle>
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
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Spot Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">Difficulty</span>
                </div>
                <Badge variant="secondary">Intermediate</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <div className="flex items-center gap-3">
                  <Navigation className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">Wind Direction</span>
                </div>
                <span className="text-sm font-bold">Side-Shore (NW)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <div className="flex items-center gap-3">
                  <Waves className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">Water Surface</span>
                </div>
                <span className="text-sm font-bold">Chop / Small Wave</span>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}