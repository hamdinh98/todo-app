<?php

namespace App\resolver;
use App\Document\Task;
use App\Repository\TaskRepository;
use Doctrine\Bundle\MongoDBBundle\ManagerRegistry;


class TodoResolver
{
    private TaskRepository $taskRepo;

    public function __construct(ManagerRegistry  $managerRegistry)
    {
        $this->taskRepo = $managerRegistry->getRepository(Task::class);
    }
    public function create(Todo $todo) :void
    {
      $this->taskRepo->persist($todo);
    }
    public function update(Todo $todo,int $id)
    {
        $this->taskRepo->createQueryBuilder()->findAndUpdate($todo,$id);
    }
    public function delete(array $todosId):void
    {
        $todos = $this->taskRepo->findBy(['id'=>['$in'=>$todosId]]);
        foreach ($todos as $todo)
        {
          $this->taskRepo->remove($todo);
        }
    }
    public function findAll(string $sort, string $order):array
    {
        if($sort!=null)
        {
           return $this->taskRepo->fetchAndSortByOrder($sort,$order);
        }
        return $this->taskRepo->findAll()->toArray();
    }
    public function findById(int $id):Task
    {
        return $this->taskRepo->findBy(['id'=>$id]);
    }
    public function filterStatus(string $status):array
    {
        return $this->taskRepo->findBy(['status'=>$status])->toArray();
    }
}