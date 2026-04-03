import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Star, MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import { MOCK_SPOTS } from '@shared/mock-data'
export function ExplorePage() {
  const [filter, setFilter] = useState<string>('all')
  const filteredSpots = filter === 'all' 
    ? MOCK_SPOTS 
    : MOCK_SPOTS.filter(s => s.sportRatings[filter as keyof typeof s.sportRatings] >= 8)
  return (
    <div className="space-y-10">
      <header className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-display font-bold">Spot Explorer</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search spots, regions, or wind conditions..." className="pl-10 h-12 bg-white/5 border-white/10" />
          </div>
          <ToggleGroup type="single" value={filter} onValueChange={(val) => val && setFilter(val)} className="justify-start overflow-x-auto pb-2 md:pb-0">
            <ToggleGroupItem value="all" className="px-5">All</ToggleGroupItem>
            <ToggleGroupItem value="windsurf">Windsurf</ToggleGroupItem>
            <ToggleGroupItem value="kite">Kitesurf</ToggleGroupItem>
            <ToggleGroupItem value="wing">Wingfoil</ToggleGroupItem>
            <ToggleGroupItem value="surf">Surf</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredSpots.map((spot) => (
            <motion.div
              key={spot.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Link to={`/spot/${spot.id}`}>
                <Card className="glass-panel group overflow-hidden border-white/5 hover:border-primary/40 transition-all duration-300">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={spot.image}
                      alt={spot.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-white/80 text-xs">
                          <MapPin className="h-3 w-3" />
                          {spot.location}
                        </div>
                        <h3 className="text-xl font-bold text-white leading-tight">{spot.name}</h3>
                      </div>
                      <Badge className="bg-accent text-white border-none text-sm font-bold h-8 w-8 flex items-center justify-center p-0 rounded-lg">
                        {spot.generalRating}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {spot.description}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      {Object.entries(spot.sportRatings).map(([sport, rating]) => (
                        rating > 5 && (
                          <div key={sport} className="flex items-center gap-2 px-2 py-1 rounded-md bg-white/5 border border-white/10">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground">{sport}</span>
                            <span className={cn("text-xs font-bold", rating >= 9 ? "text-primary" : "text-foreground")}>{rating}</span>
                          </div>
                        )
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}