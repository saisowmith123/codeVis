import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="language-select">Programming Language</Label>
      <Select value={selectedLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger id="language-select" className="w-full">
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="python">Python</SelectItem>
          <SelectItem value="r">R</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
