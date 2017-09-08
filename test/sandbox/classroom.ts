import { path, post, bodyParam, GenericResponse } from '../../';
import { Student } from './resources/student';


@path('/classrooms')
class Classroom {

  @post()
  addStudent(@bodyParam({ convertTO: Student }) student: Student) {
    return new GenericResponse({ say: 'hi' });
  }

}
