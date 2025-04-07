import { ApiException } from "@/apis/ReaderBackend/core/types";
import { useState } from "react";

export const useContent = () =>{
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<ApiException | null>(null);
    

      
}