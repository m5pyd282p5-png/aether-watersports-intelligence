import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Wind, Waves, Compass, X, RotateCcw, Shield, Users } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
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
  const spotsRaw = data?.items;
  const filteredSpots = useMemo(() => {
    const spotsList = spotsRaw ?? [];
    return spotsList.filter((s): s is Spot => {
      if (!s || !s.id || !s.name) return false;
      const searchLower = search.toLowerCase();
      const matchesSearch = (s.name?.toLowerCase() ?? '').includes(searchLower) ||
                            (s.location?.toLowerCase() ?? '').includes(searchLower) ||
                            (s.region?.toLowerCase() ?? '').includes(searchLower) ||
                            (s.difficulty?.toLowerCase() ?? '').includes(searchLower);
      const sportRating = s.sportRatings ? (s.sportRatings[sportFilter as keyof typeof s.sportRatings] ?? 0) : 0;
      const matchesSport = sportFilter === 'all' || sportRating >= 7;
      const matchesRegion = regionFilter === 'All' || s.region === regionFilter;
      return matchesSearch && matchesSport && matchesRegion;
    });
  }, [spotsRaw, search, sportFilter, regionFilter]);
  const getSportIcon = (sport: string) => {
    switch (sport) {
      case 'windsurf': return <Wind className="h-3 w-3" />;
      case 'surf': return <Waves className="h-3 w-3" />;
      default: return <Compass className="h-3 w-3" />;
    }
  }
  if (error) {
    return (
      <div className="py-20 text-center space-y-6 glass-panel rounded-3xl">
        <p className="text-destructive font-medium text-xl">System synchronization failure.</p>
        <Button onClick={() => window.location.reload()} variant="outline">Retry Sync</Button>
      </div>
    )
  }
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-display font-bold">Spot Explorer</h1>
            <p className="text-muted-foreground text-lg">Discover the best sessions across the Hellenic archipelago.</p>
          </div>
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              placeholder="Search spots, skill levels..."
              className="pl-10 pr-10 h-12 bg-secondary/50 border-input rounded-xl focus-visible:ring-primary focus-visible:bg-background transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Regional Sector</span>
              <span className="text-xs text-muted-foreground">{filteredSpots.length} Results</span>
            </div>
            <ToggleGroup
              type="single"
              value={regionFilter}
              onValueChange={(val) => val && setRegionFilter(val)}
              className="justify-start overflow-x-auto no-scrollbar pb-2 flex-nowrap gap-2"
            >
              {REGIONS.map(region => (
                <ToggleGroupItem
                  key={region}
                  value={region}
                  className="px-6 rounded-full border border-border bg-background/50 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary transition-all whitespace-nowrap"
                >
                  {region}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Discipline</span>
            <ToggleGroup
              type="single"
              value={sportFilter}
              onValueChange={(val) => val && setSportFilter(val)}
              className="justify-start bg-secondary/40 p-1 rounded-xl w-fit border border-border/10"
            >
              {['all', 'windsurf', 'kite', 'wing', 'surf'].map((sport) => (
                <ToggleGroupItem
                  key={sport}
                  value={sport}
                  className="px-5 rounded-lg data-[state=on]:bg-background data-[state=on]:text-primary data-[state=on]:shadow-sm transition-all capitalize"
                >
                  {sport === 'kite' ? 'Kitesurf' : sport === 'wing' ? 'Wingfoil' : sport}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>
      </header>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <TooltipProvider>
            <AnimatePresence mode="popLayout">
              {filteredSpots.map((spot) => (
                <motion.div
                  key={spot.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={`/spot/${spot.id}`}>
                    <Card className="glass-panel group overflow-hidden border-border hover:border-primary/40 transition-all duration-300 shadow-xl hover:shadow-primary/5 h-full flex flex-col">
                      <div className="aspect-[4/3] relative overflow-hidden shrink-0">
                        <img
                          src={spot.image || 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=800'}
                          alt={spot.name}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge className="bg-white/10 backdrop-blur-md border-white/20 text-white text-[10px] uppercase font-bold tracking-widest">
                            {spot.region}
                          </Badge>
                          <Badge className="bg-accent/80 backdrop-blur-md border-none text-white text-[10px] uppercase font-bold tracking-widest">
                            {spot.difficulty}
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
                          <Badge className="bg-primary text-white border-none text-sm font-bold h-10 w-10 flex items-center justify-center p-0 rounded-xl shadow-lg shadow-primary/20">
                            {spot.generalRating}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed italic">
                            "{spot.aiInsight?.summary ?? 'Optimal conditions analysis active.'}"
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3 text-accent" />
                              {spot.crowd ?? 'Medium'} Crowd
                            </div>
                            <div className="flex items-center gap-1">
                              <Shield className="h-3 w-3 text-primary" />
                              {(spot.facilities ?? []).length} Facilities
                            </div>
                          </div>
                        </div>
                        <div className="pt-2 flex flex-wrap gap-2">
                          {spot.sportRatings && Object.entries(spot.sportRatings).map(([sport, rating]) => {
                            if (rating > 7) {
                              const gear = (spot.bestGear ?? []).find(g => g.sport === sport)?.sizeRange;
                              return (
                                <Tooltip key={sport}>
                                  <TooltipTrigger asChild>
                                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-secondary/50 border border-border group-hover:border-primary/20 transition-colors cursor-help">
                                      {getSportIcon(sport)}
                                      <span className="text-[10px] uppercase font-bold text-muted-foreground">{sport}</span>
                                      <span className="text-xs font-bold text-primary">{rating}</span>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-xs font-bold">Rec. Gear: {gear || 'Standard'}</p>
                                  </TooltipContent>
                                </Tooltip>
                              )
                            }
                            return null;
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </TooltipProvider>
          {filteredSpots.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-32 text-center space-y-6 bg-secondary/20 rounded-3xl border-2 border-dashed border-border"
            >
              <div className="h-20 w-20 bg-secondary rounded-full flex items-center justify-center mx-auto text-muted-foreground">
                <Compass className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-display font-bold">No spots discovered in this sector</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">Try broadening your search criteria or resetting the filters.</p>
              </div>
              <Button onClick={() => { setSportFilter('all'); setRegionFilter('All'); setSearch(''); }} variant="outline" className="rounded-full gap-2">
                <RotateCcw className="h-4 w-4" /> Reset Intel
              </Button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}