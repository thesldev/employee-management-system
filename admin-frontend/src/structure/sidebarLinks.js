import React from 'react';
import { AiOutlineCalendar, AiOutlineShoppingCart, AiOutlineAreaChart, AiOutlineBarChart, AiOutlineStock } from 'react-icons/ai';
import { FiShoppingBag, FiEdit} from 'react-icons/fi';
import { BsKanban} from 'react-icons/bs';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine} from 'react-icons/ri';



//
export const links = [
    {
      title: 'Dashboard',
      links: [
        {
          name: 'Analytics',
          icon: <FiShoppingBag />,
        },
      ],
    },
  
    {
      title: 'Pages',
      links: [
        {
          name: 'Jobs',
          icon: <AiOutlineShoppingCart />,
        },
        {
          name: 'employees',
          icon: <IoMdContacts />,
        },
        {
          name: 'Employee-Leaves',
          icon: <RiContactsLine />,
        },
      ],
    },
    {
      title: 'Apps',
      links: [
        {
          name: 'calendar',
          icon: <AiOutlineCalendar />,
        },
        {
          name: 'editor',
          icon: <FiEdit />,
        },
        {
          name: 'files',
          icon: <BsKanban />,
        },
      ],
    },
    {
      title: 'Charts',
      links: [
        {
          name: 'line',
          icon: <AiOutlineStock />,
        },
        {
          name: 'pie',
          icon: <AiOutlineAreaChart />,
        },
  
        {
          name: 'bar',
          icon: <AiOutlineBarChart />,
        },
        
      ],
    },
    {
      title: 'Links',
      links: [
        {
          name: 'Employee-Registration',
          icon: <AiOutlineStock />,
        },
        {
          name: 'Job-Application',
          icon: <AiOutlineAreaChart />,
        }
      ],
    },
  ];