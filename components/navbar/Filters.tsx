'use client';

import { Button, Select, SelectItem, Slider, Selection } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { FaMale, FaFemale } from 'react-icons/fa';

const Filters = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const orderByList = [
        { label: 'Last active', value: 'updated' },
        { label: 'Newest members', value: 'created' }
    ]

    const genders = [
        { value: 'male', icon: FaMale },
        { value: 'female', icon: FaFemale }
    ]

    const selectedGender=searchParams.get('gender')?.split(',') || ['male','female'];

    const handleAgeSelect = (value: number[]) => {
        const params = new URLSearchParams(searchParams);
        params.set('ageRange', value.join(','));
        router.replace(`${pathname}?${params}`);
    }

    const handleOrderSelect = (value: Selection) => {
        if (value instanceof Set) {
            const params = new URLSearchParams(searchParams);
            params.set('orderBy', value.values().next().value as string);
            router.replace(`${pathname}?${params}`);
        }
    }

    const handleGenderSelect=(value:string)=>{
        const params=new URLSearchParams(searchParams);
        if(selectedGender.includes(value)){
            params.set('gender',selectedGender.filter(g=>g!==value).toString());
        }
        else{
            params.set('gender',[...selectedGender,value].toString());
        }
        router.replace(`${pathname}?${params}`);
    }

    if (pathname !== '/members') return null;

    return (
        <div className='shadow-md py-2'>
            <div className='flex flex-row justify-around items-center'>
                <div className='text-secondary font-semibold text-xl'>Results: 10</div>
                <div className='flex gap-2 items-center'>
                    <div>Gender:</div>
                    {genders.map(({ icon: Icon, value }) => (
                        <Button key={value} size='sm' isIconOnly 
                            color={selectedGender.includes(value)?'secondary':'default'} 
                            onClick={()=>handleGenderSelect(value)}>
                            <Icon size={24} />
                        </Button>
                    ))}
                </div>
                <div className='flex felx-row items-center gap-2 w-1/4'>
                    <Slider
                        label='Age range'
                        color='secondary'
                        size='sm'
                        minValue={18}
                        maxValue={100}
                        defaultValue={[18, 100]}
                        onChangeEnd={(value) => handleAgeSelect(value as number[])}
                    />
                </div>
                <div className='w-1/4'>
                    <Select
                        size='sm'
                        variant='bordered'
                        label='Order by'
                        fullWidth
                        color='secondary'
                        aria-label='Order by selector'
                        selectedKeys={new Set([searchParams.get("orderBy") || "updated"])}
                        onSelectionChange={handleOrderSelect}
                    >
                        {orderByList.map(item => (
                            <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
        </div>
    )
}

export default Filters