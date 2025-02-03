import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "./ui/slider";
import { FC } from "react";

interface ProductFindProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  priceRange: number;
  setPriceRange: (value: number) => void;
  category: string;
  setCategory: (value: string) => void;
  uniqueCategories: string[];
  availability: string;
  setAvailability: (value: string) => void;
}

const ProductFind: FC<ProductFindProps> = ({
  searchTerm,
  setSearchTerm,
  priceRange,
  setPriceRange,
  category,
  setCategory,
  uniqueCategories,
  availability,
  setAvailability,
}) => {
  return (
    <div>
      <Card className="p-4 md:p-6 bg-white dark:bg-gray-900  rounded-lg font-primaryFront">
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 flex-wrap">
          {/* Search Field */}
          <Input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64"
          />

          {/* Price Range Slider */}
          <div className="w-full md:w-64">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Price Range: ${priceRange}
            </label>
            <Slider
              defaultValue={[priceRange]}
              min={0}
              max={1000}
              step={10}
              onValueChange={(value) => setPriceRange(value[0])}
              className="w-full"
            />
          </div>

          {/* Category Filter */}
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-56">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {uniqueCategories?.map((cat: string) => (
                <SelectItem key={cat} value={cat} className="font-primaryFront">
                  {cat?.charAt(0).toUpperCase() + cat?.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Availability Filter */}
          <Select value={availability} onValueChange={setAvailability}>
            <SelectTrigger className="w-full md:w-56">
              <SelectValue placeholder="Select availability" />
            </SelectTrigger>
            <SelectContent className="font-primaryFront">
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="in_stock">In Stock</SelectItem>
              <SelectItem value="out_of_stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductFind;
