import { useEffect, useState } from "react";

export type SizeType = {
    height: number;
    width: number;
}

export default function useSize(){
    const [size, setSize] = useState<SizeType>({
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
    })

    useEffect(() => {
        function calcSize(){
            setSize({
                height: window.innerHeight,
                width: window.innerWidth,
            })
        }
        
        // Chama imediatamente para garantir valor correto
        calcSize()
        
        window.addEventListener("resize", calcSize)

        return () => window.removeEventListener("resize", calcSize)
    }, [])

    return size
}