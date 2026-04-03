import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Wind, ArrowRight, Star, Globe, Zap, Anchor, Shield, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api-client'
import { IllustrativeBackground } from '@/components/IllustrativeBackground'
import { toast } from 'sonner'
import type { Spot } from '@shared/types'
export function HomePage() {
  const queryClient = useQueryClient();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['spots'],
    queryFn: () => api<{ items: Spot[] }>('/api/spots'),
  })
  const { mutate: resyncData, isPending: isResyncing } = useMutation({
    mutationFn: () => api('/api/system/reseed', { method: 'POST' }),
    onSuccess: () => {
      toast.success('Intelligence database synchronized.');
      queryClient.invalidateQueries({ queryKey: ['spots'] });
    },
    onError: () => toast.error('Resync failed.')
  })
  const spots = data?.items ?? []
  const topSpot = spots.length > 0 ? spots[0] : null
  const activeRegions = new Set(spots.map(s => s.region).filter(Boolean)).size;
  const avgWindSpeed = spots.length > 0
    ? (spots.reduce((acc, s) => acc + (s.forecast?.[0]?.windSpeed ?? 0), 0) / spots.length).toFixed(1)
    : "0.0";
  return (
    <div className="relative">
      <IllustrativeBackground />
      <div className="space-y-16 md:space-y-24">
        {/* Hero Section */}
        <header className="space-y-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="px-4 py-1.5 border-primary/30 bg-primary/10 text-primary mb-8 font-semibold uppercase">
              HELLENIC ARCHIPELAGO INTELLIGENCE
            </Badge>
            <h1 className="text-display text-6xl md:text-8xl font-bold leading-[0.9]">
              Archipelago-wide <br/>
              <span className="text-primary italic">Intelligence.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mt-8 leading-relaxed max-w-2xl font-light">
              Predictive meteorological analysis for athletes across the Aegean and Ionian seas.
            </p>
          </motion.div>
        </header>
        {/* Sector Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { label: "Mapped Spots", value: spots.length || "Synchronizing...", icon: Anchor },
            { label: "Active Sectors", value: activeRegions || "Scanning...", icon: Globe },
            { label: "Sector Wind", value: `${avgWindSpeed} kt`, icon: Wind },
            { label: "Sync Status", value: "Real-time", icon: Zap },
          ].map((stat, i) => (
            <Card key={i} className="bg-white/5 border-white/5 shadow-sm">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{stat.label}</p>
                  <p className="text-xl font-bold font-display">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.section>
        {/* AI Insight Hero */}
        <section className="relative z-10">
          {isLoading ? (
            <Skeleton className="h-[250px] w-full rounded-3xl" />
          ) : topSpot ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass-panel overflow-hidden border-primary/30 shadow-2xl group">
                <CardContent className="p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-[0.2em] text-xs">
                      <Sparkles className="h-4 w-4 animate-pulse" />
                      Prime Recommendation: {topSpot.name}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
                      "{topSpot.aiInsight?.summary || 'Analyzing current session windows...'}"
                    </h2>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground pt-4">
                      <div className="px-4 py-1.5 rounded-full bg-accent/20 text-accent text-xs font-bold border border-accent/20 uppercase">
                        {topSpot.aiInsight?.idealSport || 'Wingfoil'}
                      </div>
                      <div className="px-4 py-1.5 rounded-full bg-secondary text-foreground text-xs font-bold border border-border uppercase">
                        Window: {topSpot.aiInsight?.timeframe || '14:00 - 18:00'}
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <Button size="lg" className="rounded-full px-8 py-6 h-auto text-lg font-bold bg-accent hover:bg-accent/90 shadow-xl shadow-accent/20 transition-transform hover:scale-105" asChild>
                      <Link to={`/spot/${topSpot.id}`}>
                        Deep Dive <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <div className="py-20 text-center glass-panel rounded-3xl border-dashed border-2">
              <h3 className="text-xl font-bold mb-4">Intelligence Engine Initializing</h3>
              <p className="text-muted-foreground mb-8">We are currently mapping the Greek coastline. Please synchronize to begin.</p>
              <Button onClick={() => resyncData()} disabled={isResyncing} className="gap-2">
                <RefreshCw className={cn("h-4 w-4", isResyncing && "animate-spin")} />
                {isResyncing ? 'Syncing...' : 'Synchronize Intelligence'}
              </Button>
            </div>
          )}
        </section>
        {/* Trending Section */}
        <section className="space-y-8 pb-12">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-3xl font-display font-bold">Trending across the Archipelago</h3>
            <Button variant="ghost" className="hover:bg-primary/10 transition-colors" asChild>
              <Link to="/explore">Explore all spots <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              [1, 2, 3].map((i) => <Skeleton key={i} className="h-[380px] rounded-2xl" />)
            ) : spots.length > 0 ? (
              spots.slice(0, 3).map((spot, idx) => (
                <motion.div
                  key={spot.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                >
                  <Link to={`/spot/${spot.id}`}>
                    <Card className="group overflow-hidden bg-card border-white/5 hover:border-primary/50 transition-all duration-500 h-full flex flex-col">
                      <div className="aspect-video relative overflow-hidden shrink-0">
                        <img src={spot.image} alt={spot.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge className="bg-black/40 backdrop-blur-md border-white/10 text-[10px] uppercase font-bold text-white">
                            {spot.region}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-black/60 border-white/20 px-3 py-1 text-white">
                            <Star className="h-3 w-3 text-accent fill-accent mr-1" />
                            {spot.generalRating}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6 flex flex-col justify-between flex-grow">
                        <div>
                          <h4 className="text-xl font-bold group-hover:text-primary transition-colors font-display mb-1">{spot.name}</h4>
                          <p className="text-sm text-muted-foreground font-medium mb-4">{spot.location}</p>
                        </div>
                        <div className="flex gap-2 mt-auto">
                          <Badge variant="secondary" className="text-[10px] uppercase font-black px-2 py-1 bg-secondary/50">Windsurf {spot.sportRatings?.windsurf}</Badge>
                          <Badge variant="secondary" className="text-[10px] uppercase font-black px-2 py-1 bg-secondary/50">Kite {spot.sportRatings?.kite}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                Archipelago data is currently being populated.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}