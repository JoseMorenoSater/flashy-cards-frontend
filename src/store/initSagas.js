import LessonFormContainerSagas from "../features/CreateAndUpdateLesson/LessonFormContainer/sagas";
import ConceptListContainerSagas from "../features/Play/ConceptListContainer/sagas";
import LoginContainerSagas from "../features/Authentication/LoginContainer/sagas";
import LessonListSagas from "../features/Dashboard/LessonListContainer/sagas";
import SignUpSagas from "../features/Authentication/SignUpContainer/sagas";

let sagas = [
  LessonFormContainerSagas,
  ConceptListContainerSagas,
  LoginContainerSagas,
  LessonListSagas,
  SignUpSagas
];

export const initSagas = sagaMiddleware => {
  Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};
