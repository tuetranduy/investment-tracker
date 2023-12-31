import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: '#F0F0F0',
  },
  title: {
    fontSize: 25,
  },
  content: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
});

export default function StatCard({ title, icon, value }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Box>
          <Typography color="textSecondary">{title}</Typography>
          <Typography className={classes.title}>{value} USDT</Typography>
        </Box>
        <Box className={classes.content}>{icon}</Box>
      </CardContent>
    </Card>
  );
}
