import { UserFilters } from "@/types"
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type FilterState={
    filters:UserFilters;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFilter:(filterName:keyof FilterState['filters'],value:any)=>void;
}

const useFilterStore=create<FilterState>()(devtools((set)=>({
    filters:{
        ageRange:[18,100],
        gender:['male','female'],
        orderBy:'updated',
        withPhoto:true
    },
    setFilter:(filterName,value)=>set(state=>{
        return{
            filters:{...state.filters,[filterName]:value}
        }
    })
})))

export default useFilterStore;
