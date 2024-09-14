'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const liftingData = {
  male: {
    squat: [
      { level: 'Noob', min: 0.5, max: 1.5 },
      { level: 'Beginner', min: 1.25, max: 1.25 },
      { level: 'Intermediate', min: 1.25, max: 1.75 },
      { level: 'Advanced', min: 1.75, max: 2.5 },
      { level: 'Elite', min: 2.5, max: 3 },
      { level: 'Freak', min: 3, max: 6 },
    ],
    bench: [
      { level: 'Noob', min: 0.5, max: 1 },
      { level: 'Beginner', min: 1, max: 1 },
      { level: 'Intermediate', min: 1, max: 1.5 },
      { level: 'Advanced', min: 1.5, max: 2 },
      { level: 'Elite', min: 2, max: 2.25 },
      { level: 'Freak', min: 2.25, max: 6 },
    ],
    deadlift: [
      { level: 'Noob', min: 0.5, max: 1.5 },
      { level: 'Beginner', min: 1.5, max: 1.5 },
      { level: 'Intermediate', min: 1.5, max: 2.25 },
      { level: 'Advanced', min: 2.25, max: 3 },
      { level: 'Elite', min: 3, max: 3.5 },
      { level: 'Freak', min: 3.5, max: 6 },
    ],
  },
  female: {
    squat: [
      { level: 'Noob', min: 0.5, max: 1 },
      { level: 'Beginner', min: 0.5, max: 1 },
      { level: 'Intermediate', min: 1, max: 1.5 },
      { level: 'Advanced', min: 1.5, max: 1.75 },
      { level: 'Elite', min: 1.75, max: 2.25 },
      { level: 'Freak', min: 2.25, max: 6 },
    ],
    bench: [
      { level: 'Noob', min: 0, max: 0.5 },
      { level: 'Beginner', min: 0.5, max: 0.5 },
      { level: 'Intermediate', min: 0.5, max: 0.75 },
      { level: 'Advanced', min: 0.75, max: 1 },
      { level: 'Elite', min: 1, max: 1.25 },
      { level: 'Freak', min: 1.25, max: 6 },
    ],
    deadlift: [
      { level: 'Noob', min: 0.5, max: 1.5 },
      { level: 'Beginner', min: 0.5, max: 1 },
      { level: 'Intermediate', min: 1.25, max: 1.75 },
      { level: 'Advanced', min: 1.75, max: 2.25 },
      { level: 'Elite', min: 2.25, max: 3 },
      { level: 'Freak', min: 3, max: 6 },
    ],
  },
};

const exampleAthletes = [
  {
    name: 'Jeff Nippard',
    gender: 'male',
    bodyweight: 81.65, // 180lbs in kg
    squat: 218,
    bench: 172,
    deadlift: 240,
    image: '/images/jeff.png',
    initials: 'JN',
  },
  {
    name: 'Taylor Atwood',
    gender: 'male',
    bodyweight: 74,
    squat: 303,
    bench: 195,
    deadlift: 340.5,
    image: '/images/taylor.png',
    initials: 'TA',
  },
  {
    name: 'Jessica Buettner',
    gender: 'female',
    bodyweight: 76,
    squat: 210.5,
    bench: 105,
    deadlift: 247.5,
    image: '/images/jessica.png',
    initials: 'JB',
  },
];

export default function StrengthIndex() {
  const [gender, setGender] = useState('male');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [viewMode, setViewMode] = useState('multiplier');
  const [bodyweight, setBodyweight] = useState('');
  const [squat, setSquat] = useState('');
  const [bench, setBench] = useState('');
  const [deadlift, setDeadlift] = useState('');
  const [message, setMessage] = useState('');
  const [userLevels, setUserLevels] = useState({
    squat: 0,
    bench: 0,
    deadlift: 0,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedAthlete, setSelectedAthlete] = useState(null);

  const calculateLevel = (lift, weight, bw) => {
    if (isNaN(bw) || isNaN(weight) || bw <= 0 || weight < 0) {
      return 0;
    }
    return weight / bw;
  };

  const getLiftLevel = (lift, multiplier) => {
    const levels = liftingData[gender][lift];
    for (let i = levels.length - 1; i >= 0; i--) {
      if (multiplier >= levels[i].min) {
        return levels[i].level;
      }
    }
    return 'Noob';
  };

  const getLiftExplanation = (lift, multiplier) => {
    const level = getLiftLevel(lift, multiplier);
    const levels = liftingData[gender][lift];
    const currentLevel = levels.find((l) => l.level === level);
    const nextLevel = levels[levels.indexOf(currentLevel) + 1];

    if (level === 'Freak') {
      return `You're at the top level! Your ${lift} is ${multiplier.toFixed(
        2
      )}x your bodyweight, which is exceptional.`;
    } else {
      return `Your ${lift} is ${multiplier.toFixed(
        2
      )}x your bodyweight. To reach the next level (${
        nextLevel.level
      }), you need to lift ${nextLevel.min.toFixed(2)}x your bodyweight.`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bw = parseFloat(bodyweight);
    const sq = parseFloat(squat);
    const bn = parseFloat(bench);
    const dl = parseFloat(deadlift);

    if (bodyweight === '' && squat === '' && bench === '' && deadlift === '') {
      setErrorMessage('Please enter some values');
      setMessage('');
      return;
    }

    setErrorMessage('');

    if (isNaN(bw) || bw <= 0) {
      setMessage(
        "Nice try, but humans typically weigh more than 0. Unless you're a ghost? 👻"
      );
      return;
    }

    if (isNaN(sq) || isNaN(bn) || isNaN(dl) || sq < 0 || bn < 0 || dl < 0) {
      setMessage(
        'Negative lifts? Are you lifting in an alternate universe where gravity pushes things up? 🙃'
      );
      return;
    }

    if (sq > bw * 6 || bn > bw * 6 || dl > bw * 6) {
      setMessage(
        "Wow, you must be Superman! Or maybe you're just really bad at math. 🦸‍♂️🧮"
      );
      return;
    }

    setUserLevels({
      squat: calculateLevel('squat', sq, bw),
      bench: calculateLevel('bench', bn, bw),
      deadlift: calculateLevel('deadlift', dl, bw),
    });
    setMessage(
      `Great job! You're on your way to becoming a lifting legend! 💪`
    );
  };

  const convertWeight = (weight, fromUnit, toUnit) => {
    if (fromUnit === toUnit) return weight;
    return fromUnit === 'kg' ? weight * 2.20462 : weight / 2.20462;
  };

  const getChartData = useMemo(() => {
    const bw = parseFloat(bodyweight) || 100; // Default to 100 if bodyweight is not set
    return liftingData[gender].squat.map((item, index) => {
      const baseData = {
        level: item.level,
        squat: liftingData[gender].squat[index].max,
        bench: liftingData[gender].bench[index].max,
        deadlift: liftingData[gender].deadlift[index].max,
      };

      if (viewMode === 'multiplier') {
        return baseData;
      } else {
        const unit = viewMode;
        return {
          ...baseData,
          squat: convertWeight(baseData.squat * bw, 'kg', unit),
          bench: convertWeight(baseData.bench * bw, 'kg', unit),
          deadlift: convertWeight(baseData.deadlift * bw, 'kg', unit),
        };
      }
    });
  }, [gender, bodyweight, viewMode]);

  const yAxisLabel =
    viewMode === 'multiplier'
      ? 'Bodyweight Multiplier'
      : viewMode.toUpperCase();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const unit = viewMode === 'multiplier' ? 'x bodyweight' : viewMode;
      return (
        <div className='bg-white p-2 border border-gray-300 rounded shadow'>
          <p className='font-bold'>{data.level}</p>
          <p>
            Squat: {data.squat.toFixed(2)} {unit}
          </p>
          <p>
            Bench: {data.bench.toFixed(2)} {unit}
          </p>
          <p>
            Deadlift: {data.deadlift.toFixed(2)} {unit}
          </p>
        </div>
      );
    }
    return null;
  };

  const getUserLevelValue = (lift) => {
    const bw = parseFloat(bodyweight) || 100; // Default to 100 if bodyweight is not set
    const value = userLevels[lift] * bw;
    return viewMode === 'multiplier'
      ? userLevels[lift]
      : convertWeight(value, 'kg', viewMode);
  };

  const getAthleteLevelValue = (lift) => {
    if (!selectedAthlete) return 0;
    const multiplier = selectedAthlete[lift] / selectedAthlete.bodyweight;
    if (viewMode === 'multiplier') {
      return multiplier;
    } else {
      return convertWeight(selectedAthlete[lift], 'kg', viewMode);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='space-y-8'
    >
      <Card>
        <CardHeader>
          <CardTitle>Strength Index Calculator</CardTitle>
          <CardDescription>
            Enter your lifting stats to see where you stand!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <Select onValueChange={setGender} defaultValue={gender}>
              <SelectTrigger>
                <SelectValue placeholder='Select gender' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='male'>Male</SelectItem>
                <SelectItem value='female'>Female</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setWeightUnit} defaultValue={weightUnit}>
              <SelectTrigger>
                <SelectValue placeholder='Select weight unit' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='kg'>Kilograms (kg)</SelectItem>
                <SelectItem value='lbs'>Pounds (lbs)</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type='number'
              placeholder='Bodyweight'
              value={bodyweight}
              onChange={(e) => setBodyweight(e.target.value)}
            />
            <div>
              <Input
                type='number'
                placeholder='Squat'
                value={squat}
                onChange={(e) => setSquat(e.target.value)}
              />
              {userLevels.squat > 0 && (
                <div className='mt-2 text-sm'>
                  <span className='font-bold'>
                    Level: {getLiftLevel('squat', userLevels.squat)}
                  </span>
                  <p>{getLiftExplanation('squat', userLevels.squat)}</p>
                </div>
              )}
            </div>
            <div>
              <Input
                type='number'
                placeholder='Bench'
                value={bench}
                onChange={(e) => setBench(e.target.value)}
              />
              {userLevels.bench > 0 && (
                <div className='mt-2 text-sm'>
                  <span className='font-bold'>
                    Level: {getLiftLevel('bench', userLevels.bench)}
                  </span>
                  <p>{getLiftExplanation('bench', userLevels.bench)}</p>
                </div>
              )}
            </div>
            <div>
              <Input
                type='number'
                placeholder='Deadlift'
                value={deadlift}
                onChange={(e) => setDeadlift(e.target.value)}
              />
              {userLevels.deadlift > 0 && (
                <div className='mt-2 text-sm'>
                  <span className='font-bold'>
                    Level: {getLiftLevel('deadlift', userLevels.deadlift)}
                  </span>
                  <p>{getLiftExplanation('deadlift', userLevels.deadlift)}</p>
                </div>
              )}
            </div>
            <Button type='submit'>Calculate</Button>
          </form>
          {errorMessage && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='mt-4 text-center font-bold text-red-500'
            >
              {errorMessage}
            </motion.p>
          )}
          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='mt-4 text-center font-bold'
            >
              {message}
            </motion.p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Strength Comparison Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='mb-4 space-y-4'>
            <Select onValueChange={setViewMode} defaultValue={viewMode}>
              <SelectTrigger>
                <SelectValue placeholder='Select view mode' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='multiplier'>
                  Bodyweight Multiplier
                </SelectItem>
                <SelectItem value='kg'>Kilograms (kg)</SelectItem>
                <SelectItem value='lbs'>Pounds (lbs)</SelectItem>
              </SelectContent>
            </Select>
            <div>
              <h3 className='text-lg font-semibold mb-2'>Example Athletes</h3>
              <ToggleGroup
                type='single'
                onValueChange={(value) =>
                  setSelectedAthlete(
                    exampleAthletes.find((a) => a.name === value)
                  )
                }
              >
                {exampleAthletes.map((athlete) => (
                  <ToggleGroupItem
                    key={athlete.name}
                    value={athlete.name}
                    aria-label={athlete.name}
                  >
                    <Avatar>
                      <AvatarImage src={athlete.image} alt={athlete.name} />
                      <AvatarFallback>
                        {athlete.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>
          {selectedAthlete && (
            <div className='mb-4'>
              <h4 className='text-md font-semibold'>{selectedAthlete.name}</h4>
              <p>
                Bodyweight:{' '}
                {viewMode === 'lbs'
                  ? convertWeight(
                      selectedAthlete.bodyweight,
                      'kg',
                      'lbs'
                    ).toFixed(2)
                  : selectedAthlete.bodyweight.toFixed(2)}{' '}
                {viewMode === 'multiplier' ? 'kg' : viewMode}
              </p>
            </div>
          )}
          <div className='w-full h-[400px] sm:h-[500px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart
                data={getChartData}
                margin={{ top: 20, right: 110, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='level' />
                <YAxis
                  domain={viewMode === 'multiplier' ? [0, 6] : ['auto', 'auto']}
                  label={{
                    value: yAxisLabel,
                    angle: -90,
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' },
                    offset: 0,
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign='top' height={36} />
                <Line
                  type='monotone'
                  dataKey='squat'
                  stroke='#8884d8'
                  name='Squat'
                />
                <Line
                  type='monotone'
                  dataKey='bench'
                  stroke='#82ca9d'
                  name='Bench'
                />
                <Line
                  type='monotone'
                  dataKey='deadlift'
                  stroke='#ffc658'
                  name='Deadlift'
                />
                {userLevels.squat > 0 && (
                  <ReferenceLine
                    y={getUserLevelValue('squat')}
                    stroke='#FF00FF'
                    strokeDasharray='3 3'
                    label={{
                      value: `Your Squat: ${getUserLevelValue('squat').toFixed(
                        2
                      )} ${viewMode === 'multiplier' ? 'x' : viewMode}`,
                      position: 'right',
                      fill: '#FF00FF',
                      fontSize: 12,
                    }}
                  />
                )}
                {userLevels.bench > 0 && (
                  <ReferenceLine
                    y={getUserLevelValue('bench')}
                    stroke='#FF0000'
                    strokeDasharray='3 3'
                    label={{
                      value: `Your Bench: ${getUserLevelValue('bench').toFixed(
                        2
                      )} ${viewMode === 'multiplier' ? 'x' : viewMode}`,
                      position: 'right',
                      fill: '#FF0000',
                      fontSize: 12,
                    }}
                  />
                )}
                {userLevels.deadlift > 0 && (
                  <ReferenceLine
                    y={getUserLevelValue('deadlift')}
                    stroke='#00FFFF'
                    strokeDasharray='3 3'
                    label={{
                      value: `Your Deadlift: ${getUserLevelValue(
                        'deadlift'
                      ).toFixed(2)} ${
                        viewMode === 'multiplier' ? 'x' : viewMode
                      }`,
                      position: 'right',
                      fill: '#00FFFF',
                      fontSize: 12,
                    }}
                  />
                )}
                {selectedAthlete && (
                  <>
                    <ReferenceLine
                      y={getAthleteLevelValue('squat')}
                      stroke='#8884d8'
                      strokeDasharray='3 3'
                      label={{
                        value: `${
                          selectedAthlete.initials
                        }'s Squat: ${getAthleteLevelValue('squat').toFixed(
                          2
                        )} ${viewMode === 'multiplier' ? 'x' : viewMode}`,
                        position: 'right',
                        fill: '#8884d8',
                        fontSize: 12,
                      }}
                    />
                    <ReferenceLine
                      y={getAthleteLevelValue('bench')}
                      stroke='#82ca9d'
                      strokeDasharray='3 3'
                      label={{
                        value: `${
                          selectedAthlete.initials
                        }'s Bench: ${getAthleteLevelValue('bench').toFixed(
                          2
                        )} ${viewMode === 'multiplier' ? 'x' : viewMode}`,
                        position: 'right',
                        fill: '#82ca9d',
                        fontSize: 12,
                      }}
                    />
                    <ReferenceLine
                      y={getAthleteLevelValue('deadlift')}
                      stroke='#ffc658'
                      strokeDasharray='3 3'
                      label={{
                        value: `${
                          selectedAthlete.initials
                        }'s Deadlift: ${getAthleteLevelValue(
                          'deadlift'
                        ).toFixed(2)} ${
                          viewMode === 'multiplier' ? 'x' : viewMode
                        }`,
                        position: 'right',
                        fill: '#ffc658',
                        fontSize: 12,
                      }}
                    />
                  </>
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
