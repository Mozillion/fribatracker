import {html} from 'snabbdom-jsx';
import xs from 'xstream';
import isolate from '@cycle/isolate';
import MainLayout from 'layouts/main-layout';
import requireLogin from 'components/require-login';
import goBackable from 'components/ui/go-backable';
import CourseForm from 'components/forms/course-form';

function AddCourse(sources) {
    const form = CourseForm(sources);
    return form;
}

export default sources => requireLogin(isolate(MainLayout(goBackable(AddCourse))))(sources);
