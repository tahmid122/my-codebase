import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
type CardSkeletonProps = {
  count?: number;
  height?: number;
};

const SkeletonUI = ({ count = 1, height = 200 }: CardSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
      {Array.from({ length: count }).map((_, index) => (
        <Card
          className="bg-black"
          key={index}
          style={{ height: `${height}px` }}
        >
          <CardHeader>
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="h-full">
            <Skeleton className="h-full w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SkeletonUI;
