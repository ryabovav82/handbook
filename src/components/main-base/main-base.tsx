import { FC } from 'react';
import { MainBaseUI } from '../ui/main-base/main-base';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getCards } from '../../services/slices/cardSlice';

export const MainBase: FC = () => <MainBaseUI />;
