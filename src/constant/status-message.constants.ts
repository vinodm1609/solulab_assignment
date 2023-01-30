import { HttpStatus } from '@nestjs/common';
import { Messages } from './constants';

/**
 *
 * @description creating custom status message
 * @status_msg ERROR.
 * @status_msg SUCCESS
 *
 */

export const STATUS_MSG = {
  ERROR: {
    RECORD_NOT_FOUND: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Record does not exist for provided details',
      type: 'RECORD_NOT_FOUND',
    },

    FILE_NOT_FOUND: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Record does not exist for provided details',
      type: 'FILE_NOT_FOUND',
    },

    SERVER_ERROR: {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Something went wrong',
      type: 'INTERNAL_SERVER_ERROR',
    },

    RECORD_EXISTS: {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Record exist for provided details',
      type: 'RECORD_EXISTS',
    },

    MISSING_DETAILS: {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Missing required details',
      type: 'MISSING_DETAILS',
    },
  },
  SUCCESS: {
    AUTHORIZED: {
      statusCode: HttpStatus.ACCEPTED,
      message: Messages.SUCCESS,
      type: 'Authorized',
    },
    SEND_INVITE: {
      statusCode: HttpStatus.OK,
      message: Messages.SUCCESS,
      type: 'Invite send successfully',
    },
    ADDED: {
      message: 'Contact added successfully',
      type: 'ADDED',
    },

    UPDATED: {
      message: 'Record updated successfully',
      type: 'UPDATED',
    },

    DELETED: {
      message: 'Record deleted successfully',
      type: 'DELETED',
    },
  },
};
