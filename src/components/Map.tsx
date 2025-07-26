interface MapProps {
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  isLoading?: boolean;
}

const Map = ({ coordinates, isLoading }: MapProps) => {
  return (
    <div className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/5">
          <p>Loading location...</p>
        </div>
      )}

      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500">Map placeholder</p>
      </div>
    </div>
  );
};

export default Map;
