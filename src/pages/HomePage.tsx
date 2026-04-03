import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Wind, ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import { IllustrativeBackground } from '@/components/IllustrativeBackground'
import { MOCK_SPOTS } from '@shared/mock-data'
export function HomePage() {
  const topSpot = MOCK_SPOTS[0]
  return (
    <div className="relative">
      <IllustrativeBackground />
      <div className="space-y-12">
        {/* Hero Section */}
        <header className="space-y-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="px-4 py-1 border-primary/30 bg-primary/5 text-primary mb-6">
              AI Decision Engine Active
            </Badge>
            <h1 className="text-display text-5xl md:text-7xl font-bold">
              Navigate the <span className="text-primary italic">Aegean</span> with Intelligence.
            </h1>
            <p className="text-xl text-muted-foreground mt-6 leading-relaxed">
              Real-time spot ratings and AI-driven insights for windsurf, kite, and wingfoil athletes in Greece.
            </p>
          </motion.div>
        </header>
        {/* AI Insight Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-panel overflow-hidden border-primary/20">
            <CardContent className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 text-accent font-semibold uppercase tracking-wider text-sm">
                  <Sparkles className="h-4 w-4" />
                  Insight of the Day
                </div>
                <h2 className="text-3xl font-display font-bold">
                  "{topSpot.aiInsight.summary}"
                </h2>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-muted-foreground pt-2">
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-primary" />
                    <span>{topSpot.aiInsight.timeframe}</span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                    Best for: {topSpot.aiInsight.idealSport}
                  </div>
                </div>
              </div>
              <div className="shrink-0">
                <Button size="lg" className="rounded-full px-8 py-6 h-auto text-lg font-semibold bg-accent hover:bg-accent/90" asChild>
                  <Link to={`/spot/${topSpot.id}`}>
                    Go Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        {/* Top Spots Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-display font-bold">Trending Spots</h3>
            <Button variant="ghost" asChild>
              <Link to="/explore">View all <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_SPOTS.map((spot, idx) => (
              <motion.div
                key={spot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
              >
                <Link to={`/spot/${spot.id}`}>
                  <Card className="group overflow-hidden bg-card hover:border-primary/50 transition-colors">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={spot.image}
                        alt={spot.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-black/50 backdrop-blur-md border-white/20 px-2 py-1">
                          <Star className="h-3 w-3 text-accent fill-accent mr-1" />
                          {spot.generalRating}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{spot.name}</h4>
                      <p className="text-sm text-muted-foreground">{spot.location}</p>
                      <div className="mt-4 flex gap-2">
                        <Badge variant="secondary" className="text-[10px] uppercase font-bold">Windsurf {spot.sportRatings.windsurf}/10</Badge>
                        <Badge variant="secondary" className="text-[10px] uppercase font-bold">Wing {spot.sportRatings.wing}/10</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}