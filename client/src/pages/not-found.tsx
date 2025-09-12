import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 페이지를 찾을 수 없습니다</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            요청하신 페이지가 존재하지 않습니다. 홈페이지로 돌아가서 다시 시도해보세요.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
