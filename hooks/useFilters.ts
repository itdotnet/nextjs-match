import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaMale, FaFemale } from "react-icons/fa";
import useFilterStore from "./useFilterStore";
import { useEffect, useTransition } from "react";
import { Selection } from '@nextui-org/react';
import usePaginationStore from "./usePaginationStore";

export const useFilters = () => {
    const router = useRouter();
    const pathname = usePathname();

    const { filters, setFilter } = useFilterStore();

    const { ageRange, gender, orderBy } = filters;

    const [isPending, startTransition] = useTransition();

    const {pageNumber,pageSize}=usePaginationStore(state=>({
        pageNumber:state.pagination.pageNumber,
        pageSize:state.pagination.pageSize
    }))

    useEffect(() => {
        startTransition(() => {
            const searchParams = new URLSearchParams();

            if (gender) searchParams.set('gender', gender.join(','));
            if (ageRange) searchParams.set('ageRange', ageRange.toString());
            if (orderBy) searchParams.set('orderBy', orderBy);
            if(pageSize) searchParams.set('pageSize',pageSize.toString());
            if(pageNumber) searchParams.set('pageNumber',pageNumber.toString());

            router.replace(`${pathname}?${searchParams}`);
        });
    }, [ageRange, gender, orderBy, pathname, router,pageNumber,pageSize])


    const orderByList = [
        { label: 'Last active', value: 'updated' },
        { label: 'Newest members', value: 'created' }
    ]

    const genderList = [
        { value: 'male', icon: FaMale },
        { value: 'female', icon: FaFemale }
    ]


    const handleAgeSelect = (value: number[]) => {
        setFilter('ageRange', value);
    }

    const handleOrderSelect = (value: Selection) => {
        if (value instanceof Set) {
            setFilter('orderBy', value.values().next().value as string);
        }
    }

    const handleGenderSelect = (value: string) => {
        if (gender.includes(value)) setFilter('gender', gender.filter(g => g !== value));
        else setFilter('gender', [...gender, value]);
    }

    return {
        orderByList,
        genderList,
        selectAge: handleAgeSelect,
        selectGender: handleGenderSelect,
        selectOrder: handleOrderSelect,
        filters,
        isPending
    }
}