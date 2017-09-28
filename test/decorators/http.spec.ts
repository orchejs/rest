import { expect } from 'chai';
import { Route, Get, PathParam, RequestParam, GenericResponse, HttpResponseCode } from '../../';
import { RequestHelper, ServerHelper } from '../helpers';

export class Student {
  uuid: string;

  constructor(uuid?: string) {
    this.uuid = uuid;
  }
}

@Route('students')
export class StudentRS {
  @Get(':uuid')
  getStudentId(@PathParam('uuid') uuid: string): Student {
    const student: Student = new Student(uuid);
    return student;
  }
}

describe('HTTP Decorator tests', () => {
  before(async function() {
    this.timeout(0);
    await ServerHelper.initBasicServer();
  });

  it('Should GET student infos', async () => {
    const result = await RequestHelper.get('/orche/students/123');
    expect(result).to.be.equal('{"uuid":"123"}');
  });
});
