import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

// Loading Skeleton Components
const HeroSkeleton = () => (
  <div className="relative h-120 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 md:h-80">
    <div className="absolute inset-0 bg-black/20" />
    <div className="absolute top-65 px-7 md:top-20 md:right-6">
      <Skeleton className="h-32 w-64 rounded-lg" />
    </div>
    <div className="relative container mx-auto px-10 pt-8">
      <div className="max-w-2xl text-white">
        <Skeleton className="mb-2 h-10 w-80 bg-white/20" />
        <div className="mb-3 flex items-center gap-2">
          <Skeleton className="h-4 w-4 bg-white/20" />
          <Skeleton className="h-4 w-60 bg-white/20" />
        </div>
        <div className="mb-3 flex items-center gap-2">
          <Skeleton className="h-4 w-4 bg-white/20" />
          <Skeleton className="h-4 w-48 bg-white/20" />
        </div>
        <div className="mb-6 flex items-center gap-2">
          <Skeleton className="h-4 w-4 bg-white/20" />
          <Skeleton className="h-4 w-32 bg-white/20" />
        </div>
      </div>
    </div>
  </div>
);

const ContentSkeleton = () => (
  <div className="space-y-4 sm:space-y-6">
    <Skeleton className="h-8 w-48" />
    <div className="space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  </div>
);

const TicketSkeleton = () => (
  <div className="space-y-4 sm:space-y-6">
    <Skeleton className="h-8 w-32" />
    {[1, 2].map((i) => (
      <Card key={i} className="p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <Skeleton className="mb-2 h-6 w-48" />
            <Skeleton className="mb-2 h-8 w-32" />
            <Skeleton className="h-4 w-full" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </Card>
    ))}
  </div>
);

const SidebarSkeleton = () => (
  <div className="space-y-4 sm:space-y-6">
    <div className="lg:hidden">
      <Card className="border-blue-200 bg-blue-50 p-4">
        <div className="text-center">
          <Skeleton className="mx-auto mb-2 h-4 w-32" />
          <Skeleton className="mx-auto mb-3 h-8 w-24" />
          <Skeleton className="h-12 w-full" />
        </div>
      </Card>
    </div>

    <Card className="p-4 sm:p-6">
      <Skeleton className="mb-4 h-6 w-48" />
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Skeleton className="mt-0.5 h-4 w-4" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex items-start gap-3">
          <Skeleton className="mt-0.5 h-4 w-4" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex items-start gap-3">
          <Skeleton className="mt-0.5 h-4 w-4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-24" />
      </div>
    </Card>

    <Card className="p-4 sm:p-6">
      <Skeleton className="mb-4 h-6 w-32" />
      <div className="flex flex-col gap-2 sm:flex-row">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-12" />
      </div>
    </Card>
  </div>
);

export { HeroSkeleton, ContentSkeleton, TicketSkeleton, SidebarSkeleton };
