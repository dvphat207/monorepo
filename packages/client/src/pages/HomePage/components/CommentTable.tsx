import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField
} from '@mui/material';
import { Search } from '@mui/icons-material';

import { route } from '@/common/config/route';
import useMergeState from '@/common/hooks/useMergeState';
import { CommentTableColumn, CommentTableFilter, SearchCommentRequest, Comment, CommentTableFilterKey, SearchCommentResponse, UploadCommentResponse } from '../interfaces';
import { PaginateParams } from '@/common/interfaces';
import { debounce } from '@/common/utils';
import CircularIntegration from './CircularIntegration';

const columns: CommentTableColumn[] = [
  { id: 'postId', label: 'Post ID', minWidth: 50 },
  { id: '_id', label: 'ID', minWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 200 },
  { id: 'email', label: 'Email', minWidth: 200 },
  {
    id: 'body',
    label: 'Body',
    format: (value) => <div dangerouslySetInnerHTML={{ __html: value as string }} />
  }
];

const debouncedToastError = debounce((message: string) => {
  toast.error(message);
}, 500);

export default function CommentTable() {
  const [filters, setFilters] = useMergeState<CommentTableFilter>({
    postId: undefined,
    name: '',
    email: '',
    body: ''
  });

  const [paging, setPaging] = useMergeState<PaginateParams>({
    currentPage: 0,
    rowsPerPage: 20
  });

  const [totalRows, setTotalRows] = useState(0);
  const [rows, setRows] = useState<Comment[]>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPaging({ currentPage: newPage });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaging({ rowsPerPage: +event.target.value, currentPage: 0 });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: CommentTableFilterKey) => {
    switch (key) {
      case 'postId':
        if (!event.target.value) {
          setFilters({ [key]: undefined });
          break;
        }

        if (event.target.value.match(/\d+/g)) {
          setFilters({ [key]: +event.target.value });
          break;
        }

        debouncedToastError('Post ID must be a number');
        break;
      case 'name':
      case 'email':
      case 'body':
        setFilters({ [key]: event.target.value });
        break;
    }
  };

  const fetchComments = () => {
    const params: SearchCommentRequest = {
      postId: filters.postId,
      name: filters.name.trim(),
      email: filters.email.trim(),
      body: filters.body.trim(),
      page: paging.currentPage,
      limit: paging.rowsPerPage
    };

    axios
      .get(route.comments.search, { params })
      .then((response) => {
        const { data, total }: SearchCommentResponse = response.data;
        setRows(data);
        setTotalRows(total);
      })
      .catch((error) => {
        debouncedToastError(error.message);
      });
  };

  const handleUploadSuccess = (data: UploadCommentResponse) => {
    toast.success(`Created ${data.inserted}/${data.uploaded} comments`);
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging]);

  return (
    <Paper sx={{ width: '100%' }} style={{ marginTop: '10px' }}>
      <Grid style={{ marginBottom: '20px' }} container>
        <Grid item>
          <CircularIntegration onUploadSuccess={handleUploadSuccess} />
        </Grid>
      </Grid>

      <Grid style={{ marginBottom: '10px' }} container rowSpacing={1} columnSpacing={{ sm: 2, lg: 3, xl: 3 }}>
        <Grid item xs={12} sm={4} lg={6} xl={2}>
          <TextField
            fullWidth={true}
            id="postId"
            label="Enter Post ID"
            value={filters.postId}
            type="search"
            onChange={(evt) => handleSearch(evt, 'postId')}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={6} xl={2}>
          <TextField
            fullWidth={true}
            id="name"
            label="Enter Name"
            value={filters.name}
            type="search"
            onChange={(evt) => handleSearch(evt, 'name')}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={6} xl={2}>
          <TextField
            fullWidth={true}
            id="email"
            label="Enter Email"
            type="search"
            value={filters.email}
            onChange={(evt) => handleSearch(evt, 'email')}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={6} xl={6}>
          <TextField
            fullWidth={true}
            id="body"
            label="Enter Body"
            type="search"
            value={filters.body}
            onChange={(evt) => handleSearch(evt, 'body')}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2} xl={2} >
          <Button variant="contained" startIcon={<Search />} onClick={() => fetchComments()}>
            Apply filters
          </Button>
        </Grid>
      </Grid>

      <TableContainer sx={{ maxHeight: 600 }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ top: 57, minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[20, 50, 100]}
        component="div"
        count={totalRows}
        rowsPerPage={paging.rowsPerPage}
        page={paging.currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
