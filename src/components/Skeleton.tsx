export function SkeletonProfile() {
  return (
    <div className="text-center mb-12 animate-pulse">
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-gradient-to-r from-orange-200 to-pink-200 dark:from-orange-800 dark:to-pink-800 rounded-full mx-auto"></div>
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-gradient-to-r from-orange-200 to-pink-200 dark:from-orange-800 dark:to-pink-800 rounded-full"></div>
      </div>

      <div className="space-y-4">
        <div className="h-10 bg-gradient-to-r from-orange-200 to-pink-200 dark:from-orange-800 dark:to-pink-800 rounded-lg mx-auto w-48"></div>
        <div className="h-4 bg-gradient-to-r from-orange-200 to-pink-200 dark:from-orange-800 dark:to-pink-800 rounded mx-auto w-32"></div>
        <div className="h-6 bg-gradient-to-r from-orange-200 to-pink-200 dark:from-orange-800 dark:to-pink-800 rounded mx-auto w-64"></div>
      </div>

      <div className="mt-8 flex justify-center space-x-4">
        <div className="w-32 h-12 bg-gradient-to-r from-orange-200 to-pink-200 dark:from-orange-800 dark:to-pink-800 rounded-full"></div>
        <div className="w-24 h-12 bg-gradient-to-r from-orange-200 to-pink-200 dark:from-orange-800 dark:to-pink-800 rounded-full"></div>
      </div>
    </div>
  );
}

export function SkeletonLink() {
  return (
    <div className="relative animate-pulse">
      <div className="w-full h-16 bg-gradient-to-r from-orange-200 via-pink-200 to-purple-200 dark:from-orange-800 dark:via-pink-800 dark:to-purple-800 rounded-3xl"></div>
      <div className="absolute -top-3 -right-3 w-12 h-8 bg-gradient-to-r from-orange-200 to-pink-200 dark:from-orange-800 dark:to-pink-800 rounded-full"></div>
    </div>
  );
}