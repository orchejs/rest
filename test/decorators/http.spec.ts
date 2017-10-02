import { expect } from 'chai';
import {
  Route,
  Get,
  PathParam,
  QueryParam,
  RequestParam,
  GenericResponse,
  HttpResponseCode
} from '../../';
import { RequestHelper, ServerHelper } from '../helpers';

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

@Route('students')
export class StudentRS {
  @Get(':uuid')
  getStudent(@PathParam('uuid') uuid: string): Student {
    const student = students.find(st => st._id === uuid);
    return student;
  }

  @Get()
  getStudents(@QueryParam('name') name: string, @QueryParam('age') age: number): Student[] {
    return students;
  }
}

describe('HTTP Decorator tests', () => {
  before(async function() {
    this.timeout(0);
    await ServerHelper.initBasicServer();
  });

  it('Should GET a student', async () => {
    const result = await RequestHelper.get('/orche/students/59d27001fc13ae439600012c');
    const expectedValue = JSON.stringify({
      _id: '59d27001fc13ae439600012c',
      name: 'Adham Kiossel',
      age: 16,
      email: 'akiossel0@netscape.com'
    });
    expect(result).to.be.equal(expectedValue);
  });
});
