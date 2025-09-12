import { useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

interface CategoryFilterProps {
  selectedCategories?: string[];
  selectedTags?: string[];
  onCategoryChange?: (categories: string[]) => void;
  onTagChange?: (tags: string[]) => void;
  onClear?: () => void;
}

export default function CategoryFilter({
  selectedCategories = [],
  selectedTags = [],
  onCategoryChange,
  onTagChange,
  onClear
}: CategoryFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // todo: remove mock functionality
  const categories = [
    { id: 'tax-guide', name: '세무 가이드', count: 42 },
    { id: 'accounting', name: '회계', count: 28 },
    { id: 'law-updates', name: '법규 업데이트', count: 15 },
    { id: 'case-study', name: '사례 연구', count: 33 },
    { id: 'tips', name: '실무 팁', count: 51 },
    { id: 'news', name: '세무 뉴스', count: 19 }
  ];

  const popularTags = [
    { id: 'small-business', name: '중소기업', count: 89 },
    { id: 'corporation', name: '법인세', count: 67 },
    { id: 'vat', name: '부가가치세', count: 45 },
    { id: 'individual', name: '개인사업자', count: 78 },
    { id: 'tax-saving', name: '절세', count: 34 },
    { id: 'audit', name: '세무조사', count: 23 },
    { id: 'startup', name: '스타트업', count: 56 },
    { id: 'year-end', name: '연말정산', count: 41 }
  ];

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(c => c !== categoryId)
      : [...selectedCategories, categoryId];
    
    onCategoryChange?.(newCategories);
    console.log('Category toggled:', categoryId, newCategories);
  };

  const handleTagToggle = (tagId: string) => {
    const newTags = selectedTags.includes(tagId)
      ? selectedTags.filter(t => t !== tagId)
      : [...selectedTags, tagId];
    
    onTagChange?.(newTags);
    console.log('Tag toggled:', tagId, newTags);
  };

  const handleClear = () => {
    onClear?.();
    console.log('Filters cleared');
  };

  const totalFilters = selectedCategories.length + selectedTags.length;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Filter className="h-4 w-4" />
            필터
            {totalFilters > 0 && (
              <Badge variant="secondary" className="ml-1">
                {totalFilters}
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            {totalFilters > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClear}
                data-testid="button-clear-filters"
              >
                <X className="h-3 w-3 mr-1" />
                초기화
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              data-testid="button-toggle-filters"
            >
              {isExpanded ? '접기' : '펼치기'}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Selected filters */}
        {totalFilters > 0 && (
          <div>
            <div className="flex flex-wrap gap-1">
              {selectedCategories.map(categoryId => {
                const category = categories.find(c => c.id === categoryId);
                return category ? (
                  <Badge 
                    key={categoryId} 
                    variant="default" 
                    className="text-xs cursor-pointer"
                    onClick={() => handleCategoryToggle(categoryId)}
                  >
                    {category.name}
                    <X className="h-2 w-2 ml-1" />
                  </Badge>
                ) : null;
              })}
              {selectedTags.map(tagId => {
                const tag = popularTags.find(t => t.id === tagId);
                return tag ? (
                  <Badge 
                    key={tagId} 
                    variant="secondary" 
                    className="text-xs cursor-pointer"
                    onClick={() => handleTagToggle(tagId)}
                  >
                    {tag.name}
                    <X className="h-2 w-2 ml-1" />
                  </Badge>
                ) : null;
              })}
            </div>
            <Separator className="my-3" />
          </div>
        )}

        {/* Categories */}
        <div>
          <h4 className="font-medium text-sm mb-3">카테고리</h4>
          <div className="space-y-2">
            {categories.slice(0, isExpanded ? categories.length : 4).map(category => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => handleCategoryToggle(category.id)}
                  data-testid={`checkbox-category-${category.id}`}
                />
                <label 
                  htmlFor={category.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                >
                  {category.name}
                </label>
                <span className="text-xs text-muted-foreground">({category.count})</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Popular Tags */}
        <div>
          <h4 className="font-medium text-sm mb-3">인기 태그</h4>
          <div className="space-y-2">
            {popularTags.slice(0, isExpanded ? popularTags.length : 6).map(tag => (
              <div key={tag.id} className="flex items-center space-x-2">
                <Checkbox
                  id={tag.id}
                  checked={selectedTags.includes(tag.id)}
                  onCheckedChange={() => handleTagToggle(tag.id)}
                  data-testid={`checkbox-tag-${tag.id}`}
                />
                <label 
                  htmlFor={tag.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                >
                  {tag.name}
                </label>
                <span className="text-xs text-muted-foreground">({tag.count})</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}