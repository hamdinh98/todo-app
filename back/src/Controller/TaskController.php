<?php
namespace App\Controller;
use App\Document\Task;
use App\resolver\TodoResolver;
use Doctrine\ODM\MongoDB\MongoDBException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use App\DTO\TodosIds;

/**
 * @Route("/todo", name="todo")
 */
class TaskController extends AbstractController
{
    private $todoResolver;

    public function __construct(TodoResolver $todoResolver)
    {
        $this->todoResolver = $todoResolver;
    }
    /**
     * @Route("", name="create", methods={"POST"})
     * @throws MongoDBException
     */
    public function create(Request $request, SerializerInterface $serializer, ValidatorInterface $validator): JsonResponse
    {
        $todo = $serializer->deserialize($request->getContent(), Task::class, 'json');
        $errors = $validator->validate($todo);
        if (count($errors) > 0) {
            return $this->json($errors, Response::HTTP_BAD_REQUEST);
        }
        $this->todoResolver->create($todo);
        return $this->json($todo, Response::HTTP_CREATED);
    }

    /**
     * @Route("/", name="fetchAll", methods={"GET"})
     */
    public function getAll(Request $request): Response
    {
        $sortBy = $request->query->get('sortBy','title');
        $order = $request->query->get('order','desc');
        $status = $request->query->get('status');
        $todos = $this->todoResolver->findAll($sortBy , $order,$status);
        return $this->json($todos, Response::HTTP_OK);
    }

    /**
     * @Route("/get/{id}", name="fetchById", methods={"GET"})
     */
    public function getById(string $id): Response
    {
        $todo = $this->todoResolver->findById($id);
        return $this->json($todo, Response::HTTP_OK);
    }

    /**
     * @Route("/{id}", name="update", methods={"PATCH"})
     */
    public function update(Request $request,string $id,  SerializerInterface $serializer, ValidatorInterface $validator): Response
    {
        $Find_todo = $this->todoResolver->findById($id);
        $todo = $serializer->deserialize($request->getContent(),Task::class,'json',[AbstractNormalizer::OBJECT_TO_POPULATE => $Find_todo]);
        $errors = $validator->validate($todo);
        if (count($errors) > 0) {
            return $this->json($errors, Response::HTTP_BAD_REQUEST);
        }
        $this->todoResolver->create($todo);
        return $this->json($todo, Response::HTTP_OK);
    }

    /**
     * @Route("", name="delete", methods={"DELETE"})
     */
    public function delete(Request $request,SerializerInterface $serializer): Response
    {
        $todosIds = $serializer->deserialize($request->getContent(),TodosIds::class,'json');
        if($todosIds==null)
            return $this->json("todosIds is null",Response::HTTP_BAD_REQUEST);
         $this->todoResolver->delete($todosIds->getIds());
         return $this->json("success",Response::HTTP_OK);
    }

}