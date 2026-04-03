import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Wind, ArrowRight, Star, Loader2 } from 'lucide-react'
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
  const topSpot = spots[0]
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative">
      <IllustrativeBackground />
      <div className="space-y-16">
        {/* Hero Section */}
        <header className="space-y-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Badge variant="outline" className="px-4 py-1.5 border-primary/30 bg-primary/10 text-primary mb-8 font-semibold tracking-wide">
              AEGEAN SECTOR INTELLIGENCE
            </Badge>
            <h1 className="text-display text-6xl md:text-8xl font-bold leading-[0.9]">
              Navigate with <br/>
              <span className="text-primary italic">Intelligence.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mt-8 leading-relaxed max-w-2xl font-light">
              Aether translates raw Aegean meteorological data into sport-specific ratings and AI-driven insights for wind, kite, and wingfoil.
            </p>
          </motion.div>
        </header>
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
                        Insight of the Day
                      </div>
                      <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight group-hover:text-primary transition-colors">
                        "{topSpot.aiInsight.summary}"
                      </h2>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-muted-foreground pt-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                          <Wind className="h-4 w-4 text-primary" />
                          <span className="font-medium">{topSpot.aiInsight.timeframe}</span>
                        </div>
                        <div className="px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-bold border border-accent/20">
                          BEST FOR: {topSpot.aiInsight.idealSport}
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
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-display font-bold">Trending Spots</h3>
            <Button variant="ghost" className="hover:bg-primary/10 hover:text-primary transition-colors" asChild>
              <Link to="/explore">View all explorer <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[350px] rounded-2xl" />
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
                    <Card className="group overflow-hidden bg-card border-white/5 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={spot.image}
                          alt={spot.name}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-black/60 backdrop-blur-xl border-white/20 px-3 py-1 rounded-lg">
                            <Star className="h-3 w-3 text-accent fill-accent mr-1" />
                            {spot.generalRating}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h4 className="text-xl font-bold group-hover:text-primary transition-colors font-display">{spot.name}</h4>
                        <p className="text-sm text-muted-foreground font-medium mb-4">{spot.location}</p>
                        <div className="mt-4 flex gap-2">
                          <Badge variant="secondary" className="text-[10px] uppercase font-black px-2 py-1 tracking-widest bg-white/5">Windsurf {spot.sportRatings.windsurf}/10</Badge>
                          <Badge variant="secondary" className="text-[10px] uppercase font-black px-2 py-1 tracking-widest bg-white/5">Wing {spot.sportRatings.wing}/10</Badge>
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