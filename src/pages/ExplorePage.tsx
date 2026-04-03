import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Wind, Waves, Compass, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api-client'
import { cn } from '@/lib/utils'
import type { Spot } from '@shared/types'
const REGIONS = ['All', 'Cyclades', 'Ionian', 'Dodecanese', 'Attica', 'North Aegean'];
export function ExplorePage() {
  const [sportFilter, setSportFilter] = useState<string>('all')
  const [regionFilter, setRegionFilter] = useState<string>('All')
  const [search, setSearch] = useState('')
  const { data, isLoading, error } = useQuery({
    queryKey: ['spots'],
    queryFn: () => api<{ items: Spot[] }>('/api/spots'),
  })
  const spots = data?.items ?? []
  const filteredSpots = spots.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                          s.location.toLowerCase().includes(search.toLowerCase());
    const matchesSport = sportFilter === 'all' || s.sportRatings[sportFilter as keyof typeof s.sportRatings] >= 7;
    const matchesRegion = regionFilter === 'All' || s.region === regionFilter;
    return matchesSearch && matchesSport && matchesRegion;
  });
  const getSportIcon = (sport: string) => {
    switch (sport) {
      case 'windsurf': return <Wind className="h-3 w-3" />;
      case 'surf': return <Waves className="h-3 w-3" />;
      default: return <Compass className="h-3 w-3" />;
    }
  }
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
        <p className="text-destructive font-medium text-xl">Failed to load spots. Please try again later.</p>
      </div>
    )
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      <header className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-display font-bold">Spot Explorer</h1>
            <p className="text-muted-foreground">Discover the best sessions across the Hellenic archipelago.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search spots or regions..."
              className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl focus-visible:ring-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">By Region</span>
            <ToggleGroup 
              type="single" 
              value={regionFilter} 
              onValueChange={(val) => val && setRegionFilter(val)} 
              className="justify-start overflow-x-auto no-scrollbar pb-2 flex-nowrap"
            >
              {REGIONS.map(region => (
                <ToggleGroupItem 
                  key={region} 
                  value={region} 
                  className="px-6 rounded-full border border-white/5 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground whitespace-nowrap"
                >
                  {region}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">By Sport</span>
            <ToggleGroup 
              type="single" 
              value={sportFilter} 
              onValueChange={(val) => val && setSportFilter(val)} 
              className="justify-start bg-white/5 p-1 rounded-xl w-fit"
            >
              <ToggleGroupItem value="all" className="px-5 rounded-lg data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">All Sports</ToggleGroupItem>
              <ToggleGroupItem value="windsurf" className="px-5 rounded-lg data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">Windsurf</ToggleGroupItem>
              <ToggleGroupItem value="kite" className="px-5 rounded-lg data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">Kitesurf</ToggleGroupItem>
              <ToggleGroupItem value="wing" className="px-5 rounded-lg data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">Wingfoil</ToggleGroupItem>
              <ToggleGroupItem value="surf" className="px-5 rounded-lg data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">Surf</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </header>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredSpots.map((spot) => (
              <motion.div
                key={spot.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Link to={`/spot/${spot.id}`}>
                  <Card className="glass-panel group overflow-hidden border-white/5 hover:border-primary/40 transition-all duration-300 shadow-xl hover:shadow-primary/10 h-full flex flex-col">
                    <div className="aspect-[4/3] relative overflow-hidden shrink-0">
                      <img
                        src={spot.image}
                        alt={spot.name}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/10 backdrop-blur-md border-white/20 text-white text-[10px] uppercase font-bold tracking-widest">
                          {spot.region}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-white/80 text-xs font-medium">
                            <MapPin className="h-3 w-3" />
                            {spot.location}
                          </div>
                          <h3 className="text-xl font-bold text-white leading-tight font-display">{spot.name}</h3>
                        </div>
                        <Badge className="bg-accent text-white border-none text-sm font-bold h-10 w-10 flex items-center justify-center p-0 rounded-xl">
                          {spot.generalRating}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed italic">
                        "{spot.aiInsight.summary}"
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2">
                        {Object.entries(spot.sportRatings).map(([sport, rating]) => (
                          rating > 7 && (
                            <div key={sport} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-primary/30 transition-colors">
                              {getSportIcon(sport)}
                              <span className="text-[10px] uppercase font-bold text-muted-foreground">{sport}</span>
                              <span className="text-xs font-bold text-primary">{rating}</span>
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
          {filteredSpots.length === 0 && (
            <div className="col-span-full py-32 text-center space-y-6 bg-white/5 rounded-3xl border border-dashed border-white/10">
              <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center mx-auto text-muted-foreground">
                <X className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-display font-bold">No spots found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
              </div>
              <Button onClick={() => { setSportFilter('all'); setRegionFilter('All'); setSearch(''); }} variant="outline" className="rounded-full">
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}