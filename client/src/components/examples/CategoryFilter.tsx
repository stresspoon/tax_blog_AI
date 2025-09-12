import CategoryFilter from '../CategoryFilter';
import { useState } from 'react';

export default function CategoryFilterExample() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['tax-guide']);
  const [selectedTags, setSelectedTags] = useState<string[]>(['small-business', 'corporation']);

  const handleClear = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
  };

  return (
    <div className="max-w-sm">
      <h3 className="font-semibold mb-4">카테고리 필터</h3>
      <CategoryFilter
        selectedCategories={selectedCategories}
        selectedTags={selectedTags}
        onCategoryChange={setSelectedCategories}
        onTagChange={setSelectedTags}
        onClear={handleClear}
      />
    </div>
  );
}