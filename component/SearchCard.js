import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HistoryIcon from '@mui/icons-material/History';
import Grid from '@mui/material/Grid'; // Grid version 1
// import { SearchBar } from './SearchBar';
import {useSelector, useDispatch} from 'react-redux'
import { clearSearch } from '../src/store/indexSlice'
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import {useState } from 'react'

// let showCard = true;
export default function SearchCard(props) {
    // const [search, setSearch] = useState(null);
    const storeArry = useSelector((state) => state.searchHistory)
    const [showCard, setShowCard] = useState(true);
    const dispatch = useDispatch()
  return (
    <>
    <Card className={showCard ? 'search-card' : 'search-card hide-card'}>
      <CardContent>
      <Grid sx={{marginBottom: '10px'}} container spacing={0} alignItems='center' justifyContent='space-between'> 
        <Typography sx={{ fontSize: 14, fontWeight:'600' }} color="text.secondary" gutterBottom>
          Hello, going somewhere?</Typography>
        <VerticalAlignTopIcon className='cusor-pointer' htmlColor='#154b61' onClick={() => {setShowCard(false)}}/>
      </Grid>
        <Grid container spacing={0}>
            <Grid item={true} xs={12}>
              {props.children}
            </Grid>
        </Grid>
        <div style={{marginTop: '10px'}}>
          <Grid container spacing={0} alignItems='center' justifyContent='start'>
            <HistoryIcon htmlColor='#154b61'/>
            <Typography sx={{fontSize: 12, color: '#154b61', cursor: 'pointer'}}>Recent Searches</Typography>
          </Grid>
          <div className='overflow-auto'>
            {storeArry.map((s, i) => (
              <div onClick={() => {props.handleSelect(s)}} className='recent-searches' key={i}>{s}</div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardActions>
        <Grid container alignItems={'center'} justifyContent='end'>
             <div style={{fontSize: 12, color: '#3a637cde', fontWeight: 600, cursor: 'pointer'}}>
                <div onClick={() => {dispatch(clearSearch());}}>Clear History</div>
             </div>
        </Grid>
      </CardActions>
    </Card>
    {!showCard &&  <VerticalAlignBottomIcon className='position-absolute cusor-pointer' htmlColor='#154b61' onClick={() => {setShowCard(true)}}/>}
    </>
  );
}