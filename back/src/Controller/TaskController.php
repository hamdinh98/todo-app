<?php

namespace App\Controller;

use App\Document\Task;
use App\resolver\TodoResolver;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

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
        $todos = $this->todoResolver->findAll($sortBy , $order);
        return $this->json($todos, Response::HTTP_OK);
    }

    /**
     * @Route("/get/{id}", name="fetchById", methods={"GET"})
     */
    public function getById(int $todo): Response
    {
        return $this->json($todo, Response::HTTP_OK);
    }

    /**
     * @Route("/{id}", name="update", methods={"PATCH"})
     */
    public function update(Request $request, SerializerInterface $serializer, ValidatorInterface $validator): Response
    {
       $todo = $serializer->deserialize($request->getContent(),Task::class,'json');
       $errors = $validator->validate($todo);
       $id = $request->query()->get("id");
       if($errors || $id==null)
       {
           return $this->json($errors,Response::HTTP_BAD_REQUEST);
       }
       if($this->todoResolver->update($todo,$id)){
           return $this->json("Task updated with success",Response::HTTP_ACCEPTED);
       }
           return $this->json("Error",Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    /**
     * @Route("/filter", name="filter", methods={"GET"})
     */
    public function filter(Request $request,SerializerInterface $serializer): Response
    {
       $status = $request->query()->get('status');
       if($status==null)
           return $this->json("bad request",Response::HTTP_BAD_REQUEST);
       $todos = $this->todoResolver->filterStatus($status);
       $todosJson = $serializer->serialize($todos,'json');
       return $this->json($todosJson,Response::HTTP_OK);
    }

    /**
     * @Route("", name="delete", methods={"DELETE"})
     */
    public function delete(Request $request, SerializerInterface $serializer): Response
    {
        $todosIds = json($request->query()->get('todosId'));
        if($todosIds==null)
            return $this->json("todosIds is null",Response::HTTP_BAD_REQUEST);
        $this->todoResolver->delete($todosIds);
        return $this->json("success",Response::HTTP_OK);
    }
}