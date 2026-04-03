import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Wind, Waves, Compass, X, RotateCcw, Shield, Users, RefreshCw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api-client'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import type { Spot } from '@shared/types'
const REGIONS = ['All', 'Cyclades', 'Ionian', 'Dodecanese', 'Attica', 'North Aegean', 'Crete', 'Peloponnese'];
export function ExplorePage() {
  const [sportFilter, setSportFilter] = useState<string>('all')
  const [regionFilter, setRegionFilter] = useState<string>('All')
  const [search, setSearch] = useState('')
  const queryClient = useQueryClient()
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['spots'],
    queryFn: () => api<{ items: Spot[] }>('/api/spots'),
  })
  const { mutate: resyncData, isPending: isResyncing } = useMutation({
    mutationFn: () => api('/api/system/reseed', { method: 'POST' }),
    onSuccess: () => {
      toast.success('Archipelago intelligence re-synchronized.');
      queryClient.invalidateQueries({ queryKey: ['spots'] });
    },
    onError: () => toast.error('Resync failed. Check connection.')
  })
  const spotsRaw = data?.items;
  const filteredSpots = useMemo(() => {
    const spotsList = spotsRaw ?? [];
    return spotsList.filter((s): s is Spot => {
      if (!s || !s.id || !s.name) return false;
      const searchLower = search.toLowerCase();
      const matchesSearch = (s.name?.toLowerCase() ?? '').includes(searchLower) ||
                            (s.location?.toLowerCase() ?? '').includes(searchLower) ||
                            (s.region?.toLowerCase() ?? '').includes(searchLower);
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
      <div className="py-20 text-center space-y-6 glass-panel rounded-3xl max-w-2xl mx-auto px-6">
        <div className="h-16 w-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
           <RefreshCw className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="text-2xl font-display font-bold">System Sync Failure</h2>
        <p className="text-muted-foreground">The intelligence engine is currently unreachable or initializing.</p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => refetch()} variant="outline">Retry Fetch</Button>
          <Button onClick={() => resyncData()} disabled={isResyncing}>
            {isResyncing ? 'Re-Syncing...' : 'Force System Re-Sync'}
          </Button>
        </div>
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
              placeholder="Search spots, regions..."
              className="pl-10 pr-10 h-12 bg-secondary/50 border-input rounded-xl focus-visible:ring-primary transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
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
                  className="px-6 rounded-full border border-border bg-background/50 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground transition-all whitespace-nowrap"
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
                  className="px-5 rounded-lg data-[state=on]:bg-background data-[state=on]:text-primary transition-all capitalize"
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
                    <Card className="glass-panel group overflow-hidden border-border hover:border-primary/40 transition-all duration-300 shadow-xl h-full flex flex-col">
                      <div className="aspect-[4/3] relative overflow-hidden shrink-0">
                        <img
                          src={spot.image}
                          alt={spot.name}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge className="bg-black/40 backdrop-blur-md border-white/10 text-white text-[10px] uppercase font-bold tracking-widest">
                            {spot.region}
                          </Badge>
                          <Badge className="bg-accent/80 border-none text-white text-[10px] uppercase font-bold tracking-widest">
                            {spot.difficulty}
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-white/80 text-xs font-medium">
                              <MapPin className="h-3 w-3" /> {spot.location}
                            </div>
                            <h3 className="text-xl font-bold text-white leading-tight font-display">{spot.name}</h3>
                          </div>
                          <Badge className="bg-primary text-white text-sm font-bold h-9 w-9 flex items-center justify-center p-0 rounded-lg">
                            {spot.generalRating}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                        <p className="text-sm text-muted-foreground line-clamp-2 italic">
                          "{spot.aiInsight?.summary || 'Analyzing current session window...'}"
                        </p>
                        <div className="pt-2 flex flex-wrap gap-2">
                          {spot.sportRatings && Object.entries(spot.sportRatings).map(([sport, rating]) => {
                            if (rating > 7) {
                              const gear = spot.bestGear?.find(g => g.sport === sport)?.sizeRange;
                              return (
                                <Tooltip key={sport}>
                                  <TooltipTrigger asChild>
                                    <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-secondary/50 border border-border">
                                      {getSportIcon(sport)}
                                      <span className="text-xs font-bold text-primary">{rating}</span>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-xs font-bold capitalize">{sport}: {gear || 'Standard'}</p>
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
              className="col-span-full py-32 text-center space-y-8 bg-secondary/20 rounded-3xl border-2 border-dashed border-border"
            >
              <div className="h-20 w-20 bg-secondary rounded-full flex items-center justify-center mx-auto text-muted-foreground">
                <Compass className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-display font-bold">Archipelago Data Synchronizing</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">We couldn't find spots for these filters. The database might be initializing.</p>
              </div>
              <div className="flex justify-center gap-4">
                <Button onClick={() => { setSportFilter('all'); setRegionFilter('All'); setSearch(''); }} variant="outline" className="rounded-full gap-2">
                  <RotateCcw className="h-4 w-4" /> Reset Filters
                </Button>
                <Button onClick={() => resyncData()} disabled={isResyncing} variant="secondary" className="rounded-full gap-2">
                  <RefreshCw className={cn("h-4 w-4", isResyncing && "animate-spin")} />
                  {isResyncing ? 'Syncing...' : 'Re-Sync Intelligence'}
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}