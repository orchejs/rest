/**
 * @license
 * Copyright Mauricio Gemelli Vigolo.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
import { expect } from 'chai';
import {
  route,
  all,
  bodyParam,
  post,
  put,
  patch,
  head,
  get,
  del,
  pathParam,
  queryParam,
  requestParam,
  responseParam,
  headerParam,
  GenericResponse,
  HttpResponseCode
} from '../../';
import { Response } from 'express';
import { RequestHelper, ServerHelper } from '../helpers';
import { NotNullValidator } from '@orchejs/validators';

export class Student {
  _id: string;
  name: string;
  age: number;
  email: string;

  constructor(uuid?: string, name?: string, age?: number, email?: string) {
    this._id = uuid;
    this.name = name;
    this.age = age;
    this.email = email;
  }
}

const students: Student[] = [
  new Student('59d27001fc13ae439600012c', 'Adham Kiossel', 16, 'akiossel0@netscape.com'),
  new Student('59d27001fc13ae439600012d', 'Ferrell Duinbleton', 11, 'fduinbleton1@comcast.net'),
  new Student('59d27001fc13ae439600012e', 'Genvieve Haddon', 8, 'ghaddon2@washingtonpost.com'),
  new Student('59d27001fc13ae439600012f', 'Martie Giberd', 27, 'mgiberd3@altervista.org'),
  new Student('59d27001fc13ae4396000130', 'Jojo Huffer', 26, 'jhuffer4@tiny.cc'),
  new Student('59d27001fc13ae4396000131', 'Janka Ogden', 13, 'jogden5@newyorker.com'),
  new Student('59d27001fc13ae4396000132', 'Rancell Vondra', 18, 'rvondra6@vk.com'),
  new Student('59d27001fc13ae4396000133', 'Joly Lindenfeld', 14, 'jlindenfeld7@va.gov'),
  new Student('59d27001fc13ae4396000134', 'Zarla Greep', 14, 'zgreep8@wikispaces.com'),
  new Student('59d27001fc13ae4396000135', 'Elmore Shurlock', 18, 'eshurlock9@bbc.co.uk'),
  new Student('59d27001fc13ae4396000136', 'Roosevelt Skillman', 21, 'rskillmana@nasa.gov'),
  new Student('59d27001fc13ae4396000137', 'Ara Montrose', 21, 'amontroseb@senate.gov'),
  new Student('59d27001fc13ae4396000138', 'Vladamir Glanester', 10, 'vglanesterc@hc360.com'),
  new Student('59d27001fc13ae4396000139', 'Ilyse Dani', 29, 'idanid@nature.com'),
  new Student('59d27001fc13ae439600013a', 'Myrah Kervin', 27, 'mkervine@xinhuanet.com')
];

@route('students')
export class StudentRs {
  @all()
  checkHeader(
    @headerParam('content-type') contentType: string,
    @requestParam() req: any
  ) {
    if (!contentType) {
      req.headers['content-type'] = 'application/json';
    }
  }

  @post()
  createStudent(
    @bodyParam({
      validators: [{ validator: NotNullValidator }]
    })
    student: Student
  ): Student {
    student._id = '59d27001fc13ae43960001123';
    students.push(student);
    return student;
  }

  @put(':uuid')
  updateStudent(
    @pathParam('uuid') uuid: string,
    @bodyParam({ validators: [{ validator: NotNullValidator }] }) student: Student
  ): Student {
    let stu = students.find(st => st._id === uuid);
    stu = student;
    return stu;
  }  

  @patch(':uuid')
  partialUpdateStudent(
    @pathParam('uuid') uuid: string,
    @bodyParam({ validators: [{ validator: NotNullValidator }] }) student: Student
  ): Student {
    const stu = students.find(st => st._id === uuid);
    stu.name = student.name;
    return stu;
  }

  @del(':uuid')
  deleteStudent(@pathParam('uuid') uuid: string): Student {
    const index = students.findIndex(st => st._id === uuid);
    const stu: Student[] = students.splice(index, 1);
    return stu[0];
  }

  @get(':uuid')
  getStudent(@pathParam('uuid') uuid: string): Student {
    const student = students.find(st => st._id === uuid);
    return student;
  }

  @get()
  getStudents(@queryParam('name') name: string, @queryParam('minAge') minAge: number): Student[] {
    const filteredStudents = students.filter(
      stu => stu.age >= minAge && stu.name.toLowerCase().indexOf(name.toLowerCase()) > -1
    );
    return filteredStudents;
  }

  @head()
  getHead(@responseParam() res: Response): void {
    res.setHeader('LastModified', '5');
  }
}

describe('HTTP decorator tests', () => {
  before(async function() {
    this.timeout(0);
    await ServerHelper.initBasicServer();
  });

  it('Should POST a new student', async () => {
    const result = await RequestHelper.post('/orche/students', { name: 'John English' });
    expect(result._id).to.be.not.undefined;
  });

  it('Should PUT to modify a student', async () => {
    const result = await RequestHelper.put('/orche/students/59d27001fc13ae439600012c', {
      name: 'Adam Kiossel',
      age: 40
    });
    expect(result.name).to.be.equal('Adam Kiossel');
    expect(result.age).to.be.equal(40);
  });

  it('Should PATCH to modify a student', async () => {
    const result = await RequestHelper.patch('/orche/students/59d27001fc13ae439600012c', {
      name: 'Sandler Kiossel'
    });
    expect(result.name).to.be.equal('Sandler Kiossel');
  });

  it('Should DELETE a student', async () => {
    const result = await RequestHelper.delete('/orche/students/59d27001fc13ae4396000136');
    expect(result.name).to.be.equal('Roosevelt Skillman');
  });

  it('Should GET a student', async () => {
    const result = await RequestHelper.get('/orche/students/59d27001fc13ae439600012c');
    expect(result.name).to.be.equal('Sandler Kiossel');
  });

  it('Should GET a list of students with name hu and minimum age 18.', async () => {
    const result = await RequestHelper.get('/orche/students?name=hu&&minAge=18');
    expect(result).length.gte(2);
  });
  
  it('Should make a HTTP HEAD request', async () => {
    const result = await RequestHelper.head('/orche/students');
    expect(result).to.be.equal('');
  });  
  
});
