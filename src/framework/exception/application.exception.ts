import { HttpException, HttpStatus } from '@nestjs/common';
export class MissingOrIncorrectParameterException extends HttpException {
  constructor() {
    super(
      {
        resultCode: '40000',
        developerMessage: 'Missing or incorrect parameter',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
export class RequestIncorrectFormatException extends HttpException {
  constructor() {
    super(
      {
        resultCode: '40001',
        developerMessage: 'Request incorrect format',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
export class NoDocumentHasBeenEditedException extends HttpException {
  constructor() {
    super(
      {
        resultCode: '40002',
        developerMessage: 'No document has been edited',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
export class PartnerIdNotFoundException extends HttpException {
  constructor() {
    super(
      {
        resultCode: '40003',
        developerMessage: 'PartnerId not Found',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
export class AccessDeniedException extends HttpException {
  constructor() {
    super(
      {
        resultCode: '40100',
        developerMessage: 'Access Denied',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
export class PermissionDeniedException extends HttpException {
  constructor() {
    super(
      {
        resultCode: '40101',
        developerMessage: 'Permission Denied',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
export class InvalidCredentialException extends HttpException {
  constructor() {
    super(
      {
        resultCode: '40300',
        developerMessage: 'Invalid credentials',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
export class DataNotfoundException extends HttpException {
  constructor() {
    super(
      {
        resultCode: '40400',
        developerMessage: 'Data not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
export class UrlNotfoundException extends HttpException {
  constructor() {
    super(
      {
        resultCode: '40401',
        developerMessage: 'Url not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
export class UnableToDeleteException extends HttpException {
  constructor() {
    super(
      {
        resultCode: '40900',
        developerMessage: 'Unable to delete',
      },
      HttpStatus.CONFLICT,
    );
  }
}
export class MissingOrIncorrectKeyIdentifyException extends HttpException {
  constructor() {
    super(
      {
        resultCode: '41700',
        developerMessage: 'Missing or incorrect key identify',
      },
      HttpStatus.EXPECTATION_FAILED,
    );
  }
}
export class IncorrectContentTypeException extends HttpException {
  constructor() {
    super(
      {
        resultCode: '41701',
        developerMessage: 'Incorrect Content-Type',
      },
      HttpStatus.EXPECTATION_FAILED,
    );
  }
}
export class DataAlreadyExistsException extends HttpException {
  constructor() {
    super(
      {
        resultCode: '42200',
        developerMessage: 'Data already exists',
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
export class InternalServerErrorException extends HttpException {
  constructor() {
    super(
      {
        resultCode: '50000',
        developerMessage: 'Internal Server Error',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
export class MissingOrIncorrectParameterBackendException extends HttpException {
  constructor() {
    super(
      {
        resultCode: '50001',
        developerMessage: 'Missing or incorrect parameter (Backend)',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
export class DatabaseErrorException extends HttpException {
  constructor() {
    super(
      {
        resultCode: '50002',
        developerMessage: 'Database Error',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
export class UnknownFormatException extends HttpException {
  constructor() {
    super(
      {
        resultCode: '50003',
        developerMessage: 'Unknown Format',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
export class ConnectionErrorException extends HttpException {
  constructor() {
    super(
      {
        resultCode: '50004',
        developerMessage: 'Connection Error',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
export class SystemErrorException extends HttpException {
  constructor() {
    super(
      {
        resultCode: '50005',
        developerMessage: 'System Error',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
export class ConnectionTimeoutException extends HttpException {
  constructor() {
    super(
      {
        resultCode: '50400',
        developerMessage: 'Connection Timeout',
      },
      HttpStatus.GATEWAY_TIMEOUT,
    );
  }
}