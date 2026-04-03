import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Wind, ArrowRight, Star, Globe, Zap, Anchor, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api-client'
import { IllustrativeBackground } from '@/components/IllustrativeBackground'
import type { Spot } from '@shared/types'
export function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ['spots'],
    queryFn: () => api<{ items: Spot[] }>('/api/spots'),
  })
  const spots = data?.items ?? []
  const topSpot = spots.length > 0 ? spots[0] : null
  const activeRegions = new Set(spots.map(s => s.region)).size;
  const avgWindSpeed = spots.length > 0
    ? (spots.reduce((acc, s) => acc + (s.forecast?.[0]?.windSpeed ?? 0), 0) / spots.length).toFixed(1)
    : 0;
  return (
    <div className="relative">
      <IllustrativeBackground />
      <div className="space-y-16 md:space-y-24">
        {/* Hero Section */}
        <header className="space-y-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Badge variant="outline" className="px-4 py-1.5 border-primary/30 bg-primary/10 text-primary mb-8 font-semibold tracking-wide uppercase">
              HELLENIC ARCHIPELAGO INTELLIGENCE
            </Badge>
            <h1 className="text-display text-6xl md:text-8xl font-bold leading-[0.9]">
              Archipelago-wide <br/>
              <span className="text-primary italic">Intelligence.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mt-8 leading-relaxed max-w-2xl font-light">
              Predictive meteorological analysis for athletes across the Aegean and Ionian seas. Real-time practical insights for 16+ spots.
            </p>
          </motion.div>
        </header>
        {/* Sector Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { label: "Mapped Spots", value: spots.length || "16+", icon: Anchor },
            { label: "Active Regions", value: activeRegions || "5", icon: Globe },
            { label: "Avg. Sector Wind", value: `${avgWindSpeed} kt`, icon: Wind },
            { label: "Intelligence Sync", value: "Real-time", icon: Zap },
          ].map((stat, i) => (
            <Card key={i} className="bg-white/5 border-white/5 hover:bg-white/10 transition-colors shadow-sm">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold font-display">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.section>
        {/* AI Insight Card */}
        <section className="relative z-10">
          {isLoading ? (
            <Skeleton className="h-[250px] w-full rounded-3xl glass-panel" />
          ) : (
            topSpot && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="glass-panel overflow-hidden border-primary/30 shadow-2xl shadow-primary/10 group">
                  <CardContent className="p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
                    <div className="flex-1 space-y-6 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-2 text-accent font-bold uppercase tracking-[0.2em] text-xs">
                        <Sparkles className="h-4 w-4 animate-pulse" />
                        Intelligence of the Hour: {topSpot.name}
                      </div>
                      <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight group-hover:text-primary transition-colors">
                        "{topSpot.aiInsight?.summary ?? 'Optimizing session windows...'}"
                      </h2>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-muted-foreground pt-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                          <Wind className="h-4 w-4 text-primary" />
                          <span className="font-medium text-xs uppercase tracking-wider">{topSpot.aiInsight?.timeframe ?? 'ASAP'}</span>
                        </div>
                        <div className="px-4 py-1.5 rounded-full bg-accent/20 text-accent text-xs font-bold border border-accent/20 uppercase tracking-widest">
                          {topSpot.aiInsight?.idealSport ?? 'Unknown'}
                        </div>
                        <div className="px-4 py-1.5 rounded-full bg-secondary text-foreground text-xs font-bold border border-border uppercase tracking-widest">
                          Rec. Gear: {topSpot.bestGear?.[0]?.sizeRange || "Standard"}
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <Button size="lg" className="rounded-full px-10 py-8 h-auto text-xl font-bold bg-accent hover:bg-accent/90 shadow-xl shadow-accent/20 transition-all hover:scale-105" asChild>
                        <Link to={`/spot/${topSpot.id}`}>
                          Go Now <ArrowRight className="ml-2 h-6 w-6" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          )}
        </section>
        {/* Top Spots Grid */}
        <section className="space-y-8 pb-12">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-3xl font-display font-bold">Trending in the Archipelago</h3>
            <Button variant="ghost" className="hover:bg-primary/10 hover:text-primary transition-colors" asChild>
              <Link to="/explore">Explore all spots <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[380px] rounded-2xl" />
              ))
            ) : (
              spots.slice(0, 3).map((spot, idx) => (
                <motion.div
                  key={spot.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * idx, duration: 0.6 }}
                >
                  <Link to={`/spot/${spot.id}`}>
                    <Card className="group overflow-hidden bg-card border-white/5 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 h-full flex flex-col">
                      <div className="aspect-video relative overflow-hidden shrink-0">
                        <img
                          src={spot.image}
                          alt={spot.name}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge className="bg-black/40 backdrop-blur-md border-white/10 text-[10px] uppercase font-bold tracking-widest text-white">
                            {spot.region}
                          </Badge>
                          <Badge className="bg-accent/80 border-none text-[10px] uppercase font-bold tracking-widest text-white">
                            {spot.difficulty}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-black/60 backdrop-blur-xl border-white/20 px-3 py-1 rounded-lg text-white">
                            <Star className="h-3 w-3 text-accent fill-accent mr-1" />
                            {spot.generalRating}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6 flex flex-col justify-between flex-grow">
                        <div>
                          <h4 className="text-xl font-bold group-hover:text-primary transition-colors font-display mb-1">{spot.name}</h4>
                          <p className="text-sm text-muted-foreground font-medium mb-4">{spot.location}</p>
                          <div className="flex gap-4 mb-4">
                            <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-muted-foreground">
                              <Shield className="h-3 w-3 text-primary" /> {(spot.schoolInfo ?? []).length} Schools
                            </div>
                            <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-muted-foreground">
                              <Wind className="h-3 w-3 text-accent" /> {spot.bestGear?.[0]?.sizeRange || "Standard"}
                            </div>
                          </div>
                        </div>
                        <div className="mt-auto flex gap-2">
                          <Badge variant="secondary" className="text-[10px] uppercase font-black px-2 py-1 tracking-widest bg-secondary/50">Windsurf {spot.sportRatings?.windsurf ?? 0}</Badge>
                          <Badge variant="secondary" className="text-[10px] uppercase font-black px-2 py-1 tracking-widest bg-secondary/50">Wing {spot.sportRatings?.wing ?? 0}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  )
}